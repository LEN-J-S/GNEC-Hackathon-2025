import os
import json
import requests
from requests.exceptions import RequestException

def is_online(check_url: str = "http://clients3.google.com/generate_204", timeout: int = 3) -> bool:
    """
    Check internet connectivity by requesting a lightweight URL.
    Returns True if online, False if not.
    """
    try:
        resp = requests.get(check_url, timeout=timeout)
        # Google generate_204 returns HTTP 204 if online:contentReference[oaicite:7]{index=7}
        return resp.status_code == 204
    except RequestException:
        return False

def check_for_updates(metadata_url: str, local_metadata_path: str):
    """
    Fetch remote metadata JSON and compare with local versions.
    Download and apply updates for model or documents if available.
    Returns (new_chatbot, new_kb, message).
    """
    new_chatbot = None
    new_kb = None
    messages = []
    if not is_online():
        return None, None, "Offline: Skipped update check."
    # Load local metadata (if missing, treat as empty)
    if os.path.isfile(local_metadata_path):
        try:
            with open(local_metadata_path, 'r', encoding='utf-8') as f:
                local_meta = json.load(f)
        except json.JSONDecodeError:
            local_meta = {}
    else:
        local_meta = {}
    # Fetch remote metadata
    try:
        resp = requests.get(metadata_url, timeout=5)
        resp.raise_for_status()
        remote_meta = resp.json()
    except RequestException as e:
        return None, None, f"Failed to fetch update info: {e}"
    # Compare model info
    remote_model = remote_meta.get("model", {})
    local_model = local_meta.get("model", {})
    if remote_model:
        r_name = remote_model.get("name"); r_ver = remote_model.get("version")
        l_name = local_model.get("name"); l_ver = local_model.get("version")
        if l_name is None or r_name != l_name or (r_ver and l_ver and r_ver > l_ver):
            from offline_chatbot.chatbot import Chatbot
            try:
                new_chatbot = Chatbot(r_name)
                messages.append(f"Model updated to '{r_name}' (version {r_ver}).")
            except Exception as e:
                messages.append(f"Failed to download new model: {e}")
                new_chatbot = None
    # Compare documents info
    remote_docs = remote_meta.get("documents", {})
    local_docs = local_meta.get("documents", {})
    if remote_docs:
        r_doc_ver = remote_docs.get("version"); doc_url = remote_docs.get("url")
        l_doc_ver = local_docs.get("version")
        if l_doc_ver is None or (r_doc_ver and l_doc_ver and r_doc_ver > l_doc_ver):
            if doc_url:
                try:
                    doc_resp = requests.get(doc_url, timeout=10)
                    doc_resp.raise_for_status()
                    new_docs = doc_resp.json()
                    # Backup old kb file
                    kb_path = local_docs.get("path", "data/kb.json")
                    if os.path.isfile(kb_path):
                        try: os.replace(kb_path, kb_path + ".backup")
                        except Exception: pass
                    # Save new knowledge base file
                    os.makedirs(os.path.dirname(kb_path), exist_ok=True)
                    with open(kb_path, 'w', encoding='utf-8') as f:
                        json.dump(new_docs, f, ensure_ascii=False, indent=2)
                    from offline_chatbot.knowledge_base import KnowledgeBase
                    new_kb = KnowledgeBase(kb_path)
                    messages.append(f"Knowledge base updated (version {r_doc_ver}).")
                except RequestException as e:
                    messages.append(f"Failed to download updated documents: {e}")
                except Exception as e:
                    messages.append(f"Error updating knowledge base: {e}")
    # Save updated metadata to local file
    if messages:
        try:
            with open(local_metadata_path, 'w', encoding='utf-8') as f:
                json.dump(remote_meta, f, indent=2)
        except Exception as e:
            messages.append(f"(Warning) Could not save metadata locally: {e}")
    else:
        messages.append("No updates available.")
    return new_chatbot, new_kb, " ".join(messages)

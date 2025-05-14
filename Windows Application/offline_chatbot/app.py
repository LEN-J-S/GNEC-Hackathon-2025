""" Streamlit app for the offline chatbot """
import os
import streamlit as st
from offline_chatbot.chatbot import Chatbot
from offline_chatbot.knowledge_base import KnowledgeBase
from offline_chatbot import updater, search

# Set Streamlit page configuration
st.set_page_config(page_title="Offline Chatbot", page_icon="🤖", layout="centered")

# Define paths and URLs for data and updates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOCAL_METADATA_PATH = os.path.join(BASE_DIR, "data", "local_metadata.json")
UPDATE_METADATA_URL = "http://localhost:1102/latest.json"  # Local server for updates

# Initialization logic
if 'messages' not in st.session_state:
    st.session_state.messages = []
if 'chatbot' not in st.session_state:
    if updater.is_online() and not st.session_state.get('updates_checked', False):
        new_bot, new_kb, update_msg = updater.check_for_updates(UPDATE_METADATA_URL, LOCAL_METADATA_PATH)
        if update_msg and ("updated" in update_msg or "Updated" in update_msg):
            st.sidebar.success(update_msg)
        if new_bot:
            st.session_state.chatbot = new_bot
        if new_kb:
            st.session_state.knowledge_base = new_kb
        st.session_state.updates_checked = True
    if 'chatbot' not in st.session_state:
        try:
            st.session_state.chatbot = Chatbot()
        except Exception as e:
            st.error(f"Error loading chatbot model: {e}")
    if 'knowledge_base' not in st.session_state:
        try:
            st.session_state.knowledge_base = KnowledgeBase(os.path.join(BASE_DIR, "data", "kb.json"))
        except Exception as e:
            st.error(f"Error loading knowledge base: {e}")

# Sidebar UI
st.sidebar.header("Settings & Updates")
online = updater.is_online()
status_text = "🟢 Online" if online else "🔴 Offline"
st.sidebar.write(f"**Internet:** {status_text}")
if st.sidebar.button("Check for updates"):
    new_bot, new_kb, update_msg = updater.check_for_updates(UPDATE_METADATA_URL, LOCAL_METADATA_PATH)
    if new_bot:
        st.session_state.chatbot = new_bot
    if new_kb:
        st.session_state.knowledge_base = new_kb
    st.sidebar.write(update_msg)
st.sidebar.info("To perform a web search, start your message with `/search ...`")

# Process pending searches if online
if st.session_state.get("pending_searches") and updater.is_online():
    completed_queries = []
    for query in list(st.session_state.pending_searches):
        try:
            results = search.search_web(query)
            result_lines = [f"{i + 1}. [{res['title']}]({res['link']}): {res.get('snippet', '')}" for i, res in enumerate(results)]
            results_text = "🔎 **Search results:**\n" + "\n".join(result_lines) if results else "No results found."
        except Exception as e:
            results_text = f"Error during search: {e}"
        st.session_state.messages.append({"role": "assistant", "content": results_text})
        completed_queries.append(query)
    for q in completed_queries:
        st.session_state.pending_searches.remove(q)

# Display chat history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Chat input
user_input = st.chat_input("Ask something or /search for web")
if user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    if user_input.strip().lower().startswith("/search"):
        query = user_input[len("/search"):].strip()
        if online:
            try:
                results = search.search_web(query)
                result_lines = [f"{i + 1}. [{res['title']}]({res['link']}): {res.get('snippet', '')}" for i, res in enumerate(results)]
                results_text = "🔎 **Search results:**\n" + "\n".join(result_lines) if results else "No results found."
            except Exception as e:
                results_text = f"Error during search: {e}"
            st.session_state.messages.append({"role": "assistant", "content": results_text})
            with st.chat_message("assistant"):
                st.markdown(results_text)
        else:
            st.session_state.pending_searches = st.session_state.get('pending_searches', [])
            st.session_state.pending_searches.append(query)
            ack_text = f"🔎 Search query queued: **{query}** (will run when online)"
            st.session_state.messages.append({"role": "assistant", "content": ack_text})
            with st.chat_message("assistant"):
                st.markdown(ack_text)
    else:
        kb_snippets = []
        try:
            results = st.session_state.knowledge_base.search(user_input, top_k=3)
            kb_snippets = [doc_text for doc_text, _ in results]
        except Exception:
            kb_snippets = []
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                try:
                    reply = st.session_state.chatbot.generate_reply(st.session_state.messages[:-1], user_input, knowledge_snippets=kb_snippets)
                except Exception as e:
                    reply = f"(Error generating response: {e})"
                st.markdown(reply)
        st.session_state.messages.append({"role": "assistant", "content": reply})
    st.rerun()

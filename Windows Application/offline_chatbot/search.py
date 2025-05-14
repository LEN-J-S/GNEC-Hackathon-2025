import os
import requests
from requests.exceptions import RequestException

# SerpAPI API key (set via environment or manually)
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY", None)
if SERPAPI_API_KEY is None or SERPAPI_API_KEY.strip() == "":
    SERPAPI_API_KEY = "YOUR_SERPAPI_API_KEY"

def search_web(query: str, api_key: str = None):
    """
    Execute a Google search for the query using SerpAPI.
    Returns a list of results with 'title', 'link', 'snippet'.
    """
    key = api_key or SERPAPI_API_KEY
    if not key or key == "YOUR_SERPAPI_API_KEY":
        raise RuntimeError("SerpAPI API key is not set.")
    params = {
        "q": query,
        "api_key": key,
        "engine": "google",
        "num": 5
    }
    try:
        resp = requests.get("https://serpapi.com/search.json", params=params, timeout=10)
        resp.raise_for_status()
        data = resp.json()
    except RequestException as e:
        raise RuntimeError(f"Web search request failed: {e}")
    if "error" in data:
        raise RuntimeError(f"SerpAPI error: {data['error']}")
    results = []
    for res in data.get("organic_results", [])[:5]:
        title = res.get("title", "")
        link = res.get("link", "")
        snippet = res.get("snippet") or res.get("snippet_highlighted_words")
        if isinstance(snippet, list):
            snippet = " ... ".join(snippet)
        snippet = snippet or ""
        results.append({"title": title, "link": link, "snippet": snippet})
    return results

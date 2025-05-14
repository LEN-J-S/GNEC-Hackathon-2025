import os
import json
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss

class KnowledgeBase:
    """
    Manages a local knowledge base of documents and provides semantic search.
    Uses MiniLM embeddings and FAISS for similarity search.
    """
    def __init__(self, kb_path: str):
        # Load documents from JSON file
        if not os.path.isfile(kb_path):
            raise FileNotFoundError(f"Knowledge base file not found: {kb_path}")
        with open(kb_path, 'r', encoding='utf-8') as f:
            self.documents = json.load(f)
        # Load embedding model (MiniLM)
        self.embedder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        # Compute embeddings for all docs
        corpus_texts = [doc['text'] for doc in self.documents]
        self.doc_embeddings = self.embedder.encode(corpus_texts, show_progress_bar=False)
        # Create FAISS index for similarity search
        dim = self.doc_embeddings.shape[1]
        base_index = faiss.IndexFlatL2(dim)
        self.index = faiss.IndexIDMap(base_index)  # Fixed: supports add_with_ids
        # Add vectors to index with IDs
        ids = np.array([doc.get('id', idx) for idx, doc in enumerate(self.documents)], dtype=np.int64)
        self.index.add_with_ids(self.doc_embeddings.astype('float32'), ids)

    def search(self, query: str, top_k: int = 3):
        """
        Find top_k relevant documents for the query.
        Returns a list of (document_text, distance) tuples.
        """
        if not query:
            return []
        # Embed the query
        query_vec = self.embedder.encode([query])[0].astype('float32')
        distances, indices = self.index.search(np.array([query_vec]), top_k)
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx == -1:
                continue
            doc_text = None
            for doc in self.documents:
                if doc.get('id') == idx:
                    doc_text = doc['text']
                    break
            if doc_text is not None:
                results.append((doc_text, float(dist)))
        return results

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import re

class Chatbot:
    def __init__(self, model_name: str = "microsoft/Phi-4-mini-instruct"):
        self.model_name = model_name
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False, trust_remote_code=True,cache_dir="./model/models--microsoft--Phi-4-mini-instruct")
            self.model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True,cache_dir="./model/models--microsoft--Phi-4-mini-instruct")
            self.model.to('cpu')
        except Exception as e:
            raise RuntimeError(f"Failed to load model '{model_name}'. Error: {e}")
        
        if self.tokenizer.pad_token_id is None:
            self.tokenizer.pad_token_id = self.tokenizer.eos_token_id or 0

        self.system_prompt = "You are a helpful AI assistant."

    def _format_prompt(self, conversation_history, user_input, knowledge_snippets=None, concise=False):
        system_msg = self.system_prompt
        if knowledge_snippets:
            system_msg += "\nRelevant Information:\n" + "\n".join(knowledge_snippets)
        if concise:
            system_msg += "\nPlease provide a short and concise answer."

        prompt = f"<|system|>{system_msg}<|end|>"
        for msg in conversation_history:
            role = msg.get("role")
            content = msg.get("content")
            if role in ["user", "assistant"]:
                prompt += f"<|{role}|>{content}<|end|>"
        prompt += f"<|user|>{user_input}<|end|><|assistant|>"
        return prompt

    def clean_response(self, response: str) -> str:
        # Remove special tokens like <|end|>, <|user|>, etc.
        response = re.sub(r"<\|.*?\|>", "", response)
        return response.strip()

    def generate_reply(self, conversation_history, user_input, knowledge_snippets=None):
        prompt = self._format_prompt(conversation_history, user_input, knowledge_snippets)
        input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids

        max_tokens = 1024
        output_ids = self.model.generate(
            input_ids,
            max_new_tokens=max_tokens,
            temperature=0.0,
            do_sample=False
        )

        generated_ids = output_ids[0][input_ids.shape[1]:]
        response = self.tokenizer.decode(generated_ids, skip_special_tokens=True)
        cleaned = self.clean_response(response)

        # Retry with concise prompt if length limit likely hit
        if len(generated_ids) >= max_tokens - 10:
            prompt = self._format_prompt(conversation_history, user_input, knowledge_snippets, concise=True)
            input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids
            output_ids = self.model.generate(
                input_ids,
                max_new_tokens=max_tokens,
                temperature=0.0,
                do_sample=False
            )
            generated_ids = output_ids[0][input_ids.shape[1]:]
            response = self.tokenizer.decode(generated_ids, skip_special_tokens=True)
            cleaned = self.clean_response(response)

        return cleaned

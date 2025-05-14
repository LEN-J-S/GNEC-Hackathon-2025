# AccessAI
Bringing the world to the 4 billion still offline—one community at a time.

## Features

* 💬 Conversational interface powered by `microsoft/ph-4-mini-instruct`
* 📥 Fully offline after initial setup
* 🔧 Easy-to-use Streamlit web app

## Requirements

* Python 3.8+
* [Hugging Face Transformers](https://github.com/huggingface/transformers)
* [Streamlit](https://github.com/streamlit/streamlit)
* [Hugging Face Hub](https://github.com/huggingface/huggingface_hub)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/LeeJSC/AccessAI.git
   cd AccessAI
   ```

2. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate     # On Windows: venv\\Scripts\\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

## Model Setup

> **Note:** The first run requires internet access to download the model. After downloading, the app will work fully offline.

1. **Sign in to Hugging Face** (if the model is private):

   ```bash
   huggingface-cli login
   ```

2. **Download `ph-4-mini-instruct`**

   ```python
   from transformers import AutoModelForCausalLM, AutoTokenizer

   model_name = "microsoft/ph-4-mini-instruct"
   tokenizer = AutoTokenizer.from_pretrained(model_name)
   model = AutoModelForCausalLM.from_pretrained(model_name)

   # Save locally into the `model/` directory
   tokenizer.save_pretrained("./model")
   model.save_pretrained("./model")
   ```

3. **Verify local files**
   Ensure the folder structure:

```
AccessAI/
├── data/
│   ├── kb_v1.1.json
│   └── latest.json
├── offline_chatbot/
│   ├── model/
│   ├── app.py
│   ├── chatbot.py
│   ├── knowledge_base.py
│   ├── search.py
│   └── updater.py
├── app.py
├── app.spec
├── launcher.py
├── launcher.spec
├── requirements.txt
├── LICENSE
└── README.md
```


## Running the App

Launch the Streamlit interface:

```bash
streamlit run app.py
```

Open your browser to `http://localhost:8501` to interact with the chatbot.



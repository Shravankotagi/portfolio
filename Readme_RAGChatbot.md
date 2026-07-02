# PDF RAG Chatbot

**AI Internship Project -**

A Python-based chatbot that uses Pinecone vector database and Google Gemini AI to answer questions from uploaded PDF documents through semantic search and retrieval-augmented generation.

---

## Features

- Upload and process multiple PDF documents
- Ask natural language questions about document content
- Get AI-powered answers with source citations
- Automatic clearing of old data when processing new PDFs
- Interactive Streamlit web interface

## Technology Stack

- **PDF Processing:** PyPDF2
- **Embeddings:** sentence-transformers (all-MiniLM-L6-v2)
- **Vector Database:** Pinecone
- **LLM:** Google Gemini 2.5 Flash
- **Frontend:** Streamlit

---

## Installation

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up API Keys

Create a `.env` file in the project root:

```env
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=us-east-1
GOOGLE_API_KEY=your_gemini_api_key_here
```

**Get API Keys:**
- **Pinecone:** Sign up at [pinecone.io](https://www.pinecone.io/)
- **Google Gemini:** Get key from [Google AI Studio](https://aistudio.google.com/apikey)

---

## Usage

### Run the Application

```bash
python -m streamlit run app.py
```

### Using the Chatbot

1. Upload PDF files using the sidebar
2. Click "Process PDFs" button
3. Wait for processing to complete
4. Ask questions in the chat interface
5. View answers with source context

---

## Project Structure

```
pdf-rag-chatbot/
├── .env                      # API keys
├── requirements.txt          # Dependencies
├── pdf_rag_chatbot.py       # Main chatbot logic
├── app.py                    # Streamlit UI
├── check_models.py          # Check available models
└── README.md                 # Documentation
```

---

## How It Works

1. Extract text from PDFs
2. Split text into chunks with overlap
3. Generate vector embeddings
4. Store embeddings in Pinecone
5. Convert user questions to embeddings
6. Retrieve relevant chunks from Pinecone
7. Generate answers using Gemini AI with context

---

## Troubleshooting

**API Key Errors:**
- Check `.env` file exists and has correct keys

**Model Not Found:**
- Run `python check_models.py` to see available models

**PDF Processing Fails:**
- Ensure PDFs are not password-protected
- PDFs must contain extractable text

---

## Customization

**Change chunk size** in `pdf_rag_chatbot.py`:
```python
def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50):
```

**Adjust retrieved results** in `pdf_rag_chatbot.py`:
```python
def query(self, question: str, top_k: int = 3):
```

**Switch AI model** in `pdf_rag_chatbot.py`:
```python
self.llm = genai.GenerativeModel('gemini-2.5-flash')
```

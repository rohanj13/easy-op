import os
import requests
from pinecone import Pinecone
from openai import OpenAI

# Configuration
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "openai")  # "openai" or "ollama"
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
OLLAMA_EMBED_MODEL = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")

openai_api_key = os.getenv("OPENAI_API_KEY")
pinecone_api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=pinecone_api_key)
index_name = "preopai-index-py"
openai_embed_model = "text-embedding-3-small"
index = pc.Index(index_name)
openai_client = OpenAI()

SYSTEM_PROMPT = """You are the anesthesiologist seeing this patient in the preoperative clinic 2 weeks before the date of operation. The patients have already taken their routine preoperative investigations and the findings are listed within the clinical summary.
Your role is to evaluate the clinical summary and give the preoperative anesthesia instructions for the following patient targeted to your fellow medical colleagues. You are to follow strictly the guidelines.
Your instructions should consist of the following components:
1. Provide a traffic light status for the surgery. If there is a risk and the patient needs to be seen by a Doctor or a Nurse, its red, if further tests are required, its yellow; if the patient is healthy and ready for surgery, its green.
2. Fasting instructions - list instructions based on the number of hours before the time of the listed surgery
3. Suitability for preoperative carbohydrate loading — yes/no.
4. Medication instructions — name each medication and give the instructions for the day of the operation and days leading up to the operation as required.
5. Any instructions for the healthcare team—for example, preoperative blood group matching, arranging for preoperative dialysis, or standby post-operative high dependency/ICU beds.
6. Provide the RCRI, ASA, DASI and STOP-BANG scores for the patient. If you cannot calculate it, provide the extra information you need to calculate it.
Your instructions are the final instructions, explain the reasoning for your if you are uncertain, explain what further information you require.
If the medical condition is already optimized, there is no need to offer further optimization. If there are no relevant instructions in any of the above categories, leave it blank and write NA"""


def get_embedding_openai(text):
    """Get embedding using OpenAI API"""
    res = openai_client.embeddings.create(
        input=[text],
        model=openai_embed_model
    )
    return res.data[0].embedding


def get_embedding_ollama(text):
    """Get embedding using Ollama API"""
    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/embeddings",
        json={
            "model": OLLAMA_EMBED_MODEL,
            "prompt": text
        }
    )
    response.raise_for_status()
    return response.json()["embedding"]


def get_embedding(text):
    """Get embedding based on configured provider"""
    if LLM_PROVIDER == "ollama":
        # return get_embedding_ollama(text)
        return get_embedding_openai(text)
    else:
        return get_embedding_openai(text)


def generate_response_openai(augmented_query):
    """Generate response using OpenAI API"""
    response = openai_client.chat.completions.create(
        model="o3-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": augmented_query},
        ]
    )
    return response.choices[0].message.content


def generate_response_ollama(augmented_query):
    """Generate response using Ollama API"""
    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/chat",
        json={
            "model": OLLAMA_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": augmented_query}
            ],
            "stream": False
        }
    )
    response.raise_for_status()
    return response.json()["message"]["content"]


def generate_response(augmented_query):
    """Generate response based on configured provider"""
    if LLM_PROVIDER == "ollama":
        return generate_response_ollama(augmented_query)
    else:
        return generate_response_openai(augmented_query)


def run_rag_pipeline(surgery_info, medical_history):
    # Compose the query from the medical history (string or dict)
    if isinstance(medical_history, dict):
        query = "\n".join(f"{k}: {v}" for k, v in medical_history.items())
    else:
        query = str(medical_history)

    if isinstance(surgery_info, dict):
        query += " " + "\n".join(f"{k}: {v}" for k, v in surgery_info.items())
    else:
        query += " " + str(medical_history)

    print(f"RAG Pipeline - Provider: {LLM_PROVIDER}")
    print(f"RAG Pipeline - Query: {query}")
    
    # Get embedding
    xq = get_embedding(query)

    # Retrieve context from Pinecone
    res = index.query(
        namespace="__default__",
        vector=xq, 
        top_k=10, 
        include_metadata=True
    )
    contexts = [item['metadata']['text'] for item in res['matches']]
    augmented_query = "\n\n---\n\n".join(contexts) + "\n\n-----\n\n" + query

    # Generate response using configured LLM
    return generate_response(augmented_query) 
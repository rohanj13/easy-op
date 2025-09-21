import os
from pinecone import Pinecone
from openai import OpenAI

openai_api_key = os.getenv("OPENAI_API_KEY")
pinecone_api_key = os.getenv("PINECONE_API_KEY")

pc = Pinecone(api_key=pinecone_api_key)
index_name = "preopai-index-py"
embed_model = "text-embedding-3-small"
index = pc.Index(index_name)
client = OpenAI()

def run_rag_pipeline(medical_history):
    # Compose the query from the medical history (string or dict)
    if isinstance(medical_history, dict):
        query = "\n".join(f"{k}: {v}" for k, v in medical_history.items())
    else:
        query = str(medical_history)

    # Get embedding
    res = client.embeddings.create(
        input=[query],
        model=embed_model
    )
    xq = res.data[0].embedding

    # Retrieve context from Pinecone
    res = index.query(
        namespace="__default__",
        vector=xq, 
        top_k=10, 
        include_metadata=True
    )
    contexts = [item['metadata']['text'] for item in res['matches']]
    augmented_query = "\n\n---\n\n".join(contexts) + "\n\n-----\n\n" + query

    # LLM Integration (GPT 4)
    response = client.chat.completions.create(
      model="o3-mini",
      messages=[
        {"role": "system", "content": 
         "You are the anesthesiologist seeing this patient in the preoperative clinic 2 weeks before the date of operation. The patients have already taken their routine preoperative\
          investigations and the findings are listed within the clinical summary.\
          Your role is to evaluate the clinical summary and give the preoperative anesthesia instructions for the following patient targeted to your fellow medical colleagues. You are to\
          follow strictly the guidelines.\
          Your instructions should consist of the following components:\
          1. Provide a traffic light status for the surgery. If there is a risk and the patient needs to be seen by a Doctor or a Nurse, its red, if further tests are required, its yellow; if the patient is healthy and ready for surgery, its green.\
          2. Fasting instructions - list instructions based on the number of hours before the time of the listed surgery\
          3. Suitability for preoperative carbohydrate loading — yes/no.\
          4. Medication instructions — name each medication and give the instructions for the day of the operation and days leading up to the operation as required.\
          5. Any instructions for the healthcare team—for example, preoperative blood group matching, arranging for preoperative dialysis, or standby post-operative high\
          dependency/ICU beds.\
          6. Provide the RCRI, ASA, DASI and STOP-BANG scores for the patient. If you cannot calculate it, provide the extra information you need to calculate it.\
          Your instructions are the final instructions, explain the reasoning for your \
          if you are uncertain, explain what further information you require.\
          If the medical condition is already optimized, there is no need to offer further optimization. If there\
          are no relevant instructions in any of the above categories, leave it blank and write NA"}, #System Prompt
        {"role": "user", "content": augmented_query},
      ]
    )
    return response.choices[0].message.content 
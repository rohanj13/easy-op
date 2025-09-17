import os
from pinecone import Pinecone
from openai import OpenAI

openai_api_key = os.getenv("OPENAI_API_KEY")
pinecone_api_key = os.getenv("PINECONE_API_KEY")

# Retrieval Agent
pc = Pinecone(
    api_key=pinecone_api_key, #Pinecone API
    # environment="gcp-starter"
)
index_name = "preopai-index-py"

index = pc.Index(index_name)
index.describe_index_stats()

client = OpenAI()

query = str("38/Chinese/Female\
Allergy to aspirin, paracetamol, penicillin - rashes and itchiness \
ExSmoker—smoked 10 years ago/Occasional Drinker \
LMP: last month\
Wt 94.7 Ht 166.3 BMI 34.2 BP 127/81 HR 88 SpO2 100% on RA \
Coming in for BILATERAL REVISION FESS, REVISION SEPTOPLASTY, ADENOIDECTOMY, AND BILATERAL INFERIOR TURBINOPLASTIES/SEVERE OSA ON CPAP \
=== PAST MEDICAL HISTORY ===\
1. Severe OSA on CPAP—AHI 58—CPAP settings: AutoCPAP (4–15) cmH2O, without humidifier/Chinstrap\
2. Right persistent Sinusitis\
3. Allergic rhinitis\
4. Adenoid hypertrophy\
5. High BMI\
6. Asthma—f/u GP, last seen 3 months ago for attack—on PRN ventolin—Does not use ventolin at all—No previous admissions/ intubations for asthma\
7. Diabetes—HbA1C 9.4%, Last seen outpatient doctor >1 year ago.\
No history of HTN/ HLD/ IHD/ CVA\
=== SURGICAL HISTORY===\
Tonsillectomy > 10 years ago mild PONV\
===Investigations===\
Hb 13.0 TW 4 Plt 392\
INR PT APTT normal\
Na 134 K3.4 Cr 77 Glu 13\
ECG NSR\
CXR NAD\
=== MEDICATIONS===\
Ventolin PRN\
LMP; Last menstrual period, Wt; Weight") #clinical query

res = client.embeddings.create(
    input=[query],
    model=embed_model
)

xq = res.data[0].embedding
res = index.query(
    namespace="__default__",
    vector=xq, 
    top_k=10, 
    include_metadata=True
)

# Response Generation
contexts = [item['metadata']['text'] for item in res['matches']]
augmented_query = "\n\n---\n\n".join(contexts)+"\n\n-----\n\n"+query

print(augmented_query)

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

print(response.choices[0].message.content)
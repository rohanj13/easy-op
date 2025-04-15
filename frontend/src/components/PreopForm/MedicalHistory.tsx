import React from "react";
import { Form, Checkbox } from "antd";

const MedicalHistory: React.FC = () => {
  return (
    <>
      <Form.Item label="Past Medical History" name={["medicalHistory", "pastMedicalHistory"]}>
        <Checkbox.Group options={[
          "Denies any health issues", "No Significant Medical History"
        ]} />
      </Form.Item>

      <Form.Item label="Cardiovascular" name={["medicalHistory", "cardiovascular"]}>
        <Checkbox.Group options={[
          "Denies cardiovascular issues", "Denies symptoms", "Hypertension", "Ischemic heart disease", "MI", 
          "Angina/Chest Pain", "Coronary Stent", "Cardiac Surgery", "CHF", "Atrial Fibrillation", 
          "Arrhythmia/Palpitations", "AICD", "Pacemaker", "Hyperlipemia", "Ejection Fraction", "Murmur", 
          "Valvular Heart Disease", "Congenital Heart Disease", "Aneurysm (specify)", "Peripheral Vascular Disease", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Pulmonary" name={["medicalHistory", "pulmonary"]}>
        <Checkbox.Group options={[
          "Denies respiratory issues", "Denies symptoms", "Asthma", "COPD/Emphysema", "SOB", "Cough", "Wheeze", 
          "Snoring", "OSA", "CPAP", "Paroxysmal Nocturnal Dyspnoea", "Orthopnoea", "Recent URI", "Pneumonia", 
          "Home Oxygen Use", "Pulmonary Hypertension", "Lung Cancer", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Renal" name={["medicalHistory", "renal"]}>
        <Checkbox.Group options={[
          "Denies renal issues", "Acute Renal Failure", "Chronic Renal Impairment", "Haemodialysis", 
          "Peritoneal Dialysis", "Urine Output", "Fluid Restriction", "Baseline Creatinine", "Dialysis Schedule", 
          "AV Fistula", "Renal Calculi", "UTI", "Renal Cancer", "Bladder Cancer", "Prostate Cancer", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Gastrointestinal" name={["medicalHistory", "gastrointestinal"]}>
        <Checkbox.Group options={[
          "Denies GI issues", "Denies GORD", "GORD", "Hiatus Hernia", "Peptic Ulcer", "Crohn’s Disease", "IBD", 
          "Ulcerative Colitis", "Oesophageal Stricture", "Oesophageal Cancer", "Colon Cancer", "Gastric Cancer", 
          "Pancreatic Cancer", "Nausea/Vomiting", "Diarrhoea", "Dysphagia", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Hepato-Biliary" name={["medicalHistory", "hepatoBiliary"]}>
        <Checkbox.Group options={[
          "Denies hepato-biliary issues", "Fatty Liver", "Liver Failure", "Elevated LFTs", "Cirrhosis", "Gallstones", 
          "Liver Lesions", "Liver Cancer", "Biliary Cancer", "Pancreatitis", "Oesophageal Varices", "Jaundice", 
          "Hepatitis", "Liver Transplant", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Neuro" name={["medicalHistory", "neuro"]}>
        <Checkbox.Group options={[
          "Denies neurological issues", "Stroke", "Intellectual Disability", "Focal Deficits", "Carotid Disease", 
          "Syncope", "Myasthenia Gravis", "MS", "Parkinson’s Disease", "Migraine", "Seizures", "Brain Tumour", 
          "Peripheral Neuropathy", "Visual Impairment", "Dementia", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Psychiatric" name={["medicalHistory", "psychiatric"]}>
        <Checkbox.Group options={[
          "Denies psychiatric issues", "Anxiety", "Depression", "PTSD", "Schizophrenia", "Bipolar Disorder", 
          "ADHD", "Autism", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Endocrine" name={["medicalHistory", "endocrine"]}>
        <Checkbox.Group options={[
          "Denies endocrine issues", "Type 1 DM", "Type 2 DM", "Diabetic Neuropathy", "Diabetic Retinopathy", 
          "Diabetic Nephropathy", "Hyperthyroidism", "Hypothyroidism", "Goitre", "Pheochromocytoma", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Haematological" name={["medicalHistory", "haematological"]}>
        <Checkbox.Group options={[
          "Denies haematological issues", "Anaemia", "Thrombocytopenia", "Coagulopathy", "Anticoagulation", 
          "DVT", "PE", "Clotting Factor Deficiency", "Haematological Cancer", "Bone Marrow Transplant", 
          "Graft vs Host", "Sickle Cell Disease", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Muscular Skeletal" name={["medicalHistory", "muscularSkeletal"]}>
        <Checkbox.Group options={[
          "Denies musculoskeletal issues", "Osteoarthritis", "RA", "Lupus", "Fibromyalgia", "Polymyalgia Rheumatica", 
          "Chronic Back/Neck Pain", "TMJ Pain", "Carpal Tunnel", "Chronic Pain Syndrome", "Muscular Dystrophy", 
          "Spinal Surgery", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="OB GYN" name={["medicalHistory", "obGyn"]}>
        <Checkbox.Group options={[
          "Denies GYN issues", "Pregnant", "Gynaecological Cancer", "Breast Cancer", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="ENT" name={["medicalHistory", "ent"]}>
        <Checkbox.Group options={[
          "Denies ENT issues", "Hoarseness", "Stridor", "Head & Neck Cancer", "Vertigo", "Hearing Impairment", 
          "Epistaxis", "Sinus Symptoms", "Nasal Polyps", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Infectious Disease" name={["medicalHistory", "infectiousDisease"]}>
        <Checkbox.Group options={[
          "Denies infectious disease issues", "MRSA", "VRE", "Hepatitis", "HIV", "Other"
        ]} />
      </Form.Item>

      <Form.Item label="Exercise Tolerance" name={["medicalHistory", "exerciseTolerance"]}>
        <Checkbox.Group options={[
          "Denies issues", "Limited by <4 METS", ">4 METS", "Other (see notes)"
        ]} />
      </Form.Item>

      <Form.Item label="Other" name={["medicalHistory", "other"]}>
        <Checkbox.Group options={[
          "Jehovah’s Witness", "Wheelchair Bound"
        ]} />
      </Form.Item>
    </>
  );
};

export default MedicalHistory;
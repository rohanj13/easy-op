import React from "react";
import MultiColumnCheckboxGroup from "../common/MultiColumnCheckboxGroup";

const medicalHistoryOptions = ["Denies any health issues", "No Significant Medical History"];
const cardiovascularOptions = [
    "Denies cardiovascular issues", "Denies symptoms", "Hypertension", "Ischemic heart disease", "MI", 
    "Angina/Chest Pain", "Coronary Stent", "Cardiac Surgery", "CHF", "Atrial Fibrillation", 
    "Arrhythmia/Palpitations", "AICD", "Pacemaker", "Hyperlipemia", "Ejection Fraction", "Murmur", 
    "Valvular Heart Disease", "Congenital Heart Disease", "Aneurysm (specify)", "Peripheral Vascular Disease", "Other"
  ];
const pulmonaryOptions = [
    "Denies respiratory issues", "Denies symptoms", "Asthma", "COPD/Emphysema", "SOB", "Cough", "Wheeze", 
    "Snoring", "OSA", "CPAP", "Paroxysmal Nocturnal Dyspnoea", "Orthopnoea", "Recent URI", "Pneumonia", 
    "Home Oxygen Use", "Pulmonary Hypertension", "Lung Cancer", "Other"
  ];
const renalOptions = [
    "Denies renal issues", "Acute Renal Failure", "Chronic Renal Impairment", "Haemodialysis", 
    "Peritoneal Dialysis", "Urine Output", "Fluid Restriction", "Baseline Creatinine", "Dialysis Schedule", 
    "AV Fistula", "Renal Calculi", "UTI", "Renal Cancer", "Bladder Cancer", "Prostate Cancer", "Other"
  ];
const gastrointestinalOptions = 
["Denies GI issues", "Denies GORD", "GORD", "Hiatus Hernia", "Peptic Ulcer", "Crohn’s Disease", "IBD", 
"Ulcerative Colitis", "Oesophageal Stricture", "Oesophageal Cancer", "Colon Cancer", "Gastric Cancer", 
"Pancreatic Cancer", "Nausea/Vomiting", "Diarrhoea", "Dysphagia", "Other"
];

const hepatoBiliaryOptions = [
    "Denies hepato-biliary issues", "Fatty Liver", "Liver Failure", "Elevated LFTs", "Cirrhosis", "Gallstones", 
    "Liver Lesions", "Liver Cancer", "Biliary Cancer", "Pancreatitis", "Oesophageal Varices", "Jaundice", 
    "Hepatitis", "Liver Transplant", "Other"
  ];

const neuroOptions = [
    "Denies neurological issues", "Stroke", "Intellectual Disability", "Focal Deficits", "Carotid Disease", 
    "Syncope", "Myasthenia Gravis", "MS", "Parkinson’s Disease", "Migraine", "Seizures", "Brain Tumour", 
    "Peripheral Neuropathy", "Visual Impairment", "Dementia", "Other"
  ];

const psychiatricOptions = [
    "Denies psychiatric issues", "Anxiety", "Depression", "PTSD", "Schizophrenia", "Bipolar Disorder", 
    "ADHD", "Autism", "Other"
  ];

const endocrineOptions = [
    "Denies endocrine issues", "Type 1 DM", "Type 2 DM", "Diabetic Neuropathy", "Diabetic Retinopathy", 
    "Diabetic Nephropathy", "Hyperthyroidism", "Hypothyroidism", "Goitre", "Pheochromocytoma", "Other"
  ];

const muscularSkeletalOptions = [
    "Denies musculoskeletal issues", "Osteoarthritis", "RA", "Lupus", "Fibromyalgia", "Polymyalgia Rheumatica", 
    "Chronic Back/Neck Pain", "TMJ Pain", "Carpal Tunnel", "Chronic Pain Syndrome", "Muscular Dystrophy", 
    "Spinal Surgery", "Other"
  ];

const haematologicalOptions = [
    "Denies any Haematological issues", "Anaemia", "Thrombocytopenia", "Coagulopathy", "Anticoagulation",
    "Deep Vein Thrombosis", "Pulmonary Embolism", "Clotting Factor Deficiency", "Haematological Cancer",
    "Bone Marrow transplant", "Graft vs Host", "Sickle Cell", "Other"
];

const obgynOptions = [
    "Denies GYN issues", "Pregnant", "Gynaecological Cancer", "Breast Cancer", "Other"
  ];

const entOptions = [
    "Denies ENT issues", "Hoarseness", "Stridor", "Head & Neck Cancer", "Vertigo", "Hearing Impairment", 
    "Epistaxis", "Sinus Symptoms", "Nasal Polyps", "Other"
  ];

const infectiousDiseaseOptions = [
    "Denies infectious disease issues", "MRSA", "VRE", "Hepatitis", "HIV", "Other"
  ];

const exerciseToleranceOptions = [
    "Denies issues", "Limited by <4 METS", ">4 METS", "Other (see notes)"
  ];

const otherOptions = [
    "Jehovah’s Witness", "Wheelchair Bound"
  ];



const MedicalHistory: React.FC = () => {
  return (
    <>
        <MultiColumnCheckboxGroup 
            label = "Medical History"
            name = "medicalHistory"
            options = {medicalHistoryOptions}
            columns = {3}
            includeOther = {true}
            otherLabel = "Please specify"
        />

        <MultiColumnCheckboxGroup 
            label = "Cardiovascular"
            name = "cardiovascularHistory"
            options = {cardiovascularOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />
        <MultiColumnCheckboxGroup 
            label = "Respiratory"
            name = "pulmonaryHistory"
            options = {pulmonaryOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />
        <MultiColumnCheckboxGroup 
            label = "Renal"
            name = "renalHistory"
            options = {renalOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />
        <MultiColumnCheckboxGroup 
            label = "Gastrointestinal"
            name = "gastrointestinalHistory"
            options = {gastrointestinalOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />
        <MultiColumnCheckboxGroup 
            label = "Hepato-Biliary"
            name = "hepatoBiliaryHistory"
            options = {hepatoBiliaryOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
        <MultiColumnCheckboxGroup 
            label = "Neuro"
            name = "neuroHistory"
            options = {neuroOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
        <MultiColumnCheckboxGroup 
            label = "Psychiatric"
            name = "psychiatricHistory"
            options = {psychiatricOptions}
            columns = {3}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
        <MultiColumnCheckboxGroup 
            label = "Endocrine"
            name = "endocrineHistory"
            options = {endocrineOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />
        <MultiColumnCheckboxGroup 
            label = "Haematological"
            name = "haematologicalHistory"
            options = {haematologicalOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />

        <MultiColumnCheckboxGroup 
            label = "Muscular Skeletal"
            name = "muscularSkeletalHistory"
            options = {muscularSkeletalOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        />
        
        <MultiColumnCheckboxGroup 
            label = "OB GYN"
            name = "obgynHistory"
            options = {obgynOptions}
            columns = {3}
            includeOther = {true}
            otherLabel = "Please specify"
        />

        <MultiColumnCheckboxGroup 
            label = "ENT"
            name = "entHistory"
            options = {entOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
        <MultiColumnCheckboxGroup 
            label = "Infectious Disease"
            name = "infectiousDiseaseHistory"
            options = {infectiousDiseaseOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
        <MultiColumnCheckboxGroup 
            label = "Exercise Tolerance"
            name = "exerciseHistory"
            options = {exerciseToleranceOptions}
            columns = {4}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
        <MultiColumnCheckboxGroup 
            label = "Other"
            name = "otherHistory"
            options = {otherOptions}
            columns = {2}
            includeOther = {true}
            otherLabel = "Please specify"
        /> 
    </>
  );
};

export default MedicalHistory;
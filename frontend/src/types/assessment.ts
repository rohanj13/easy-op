export interface Assessment {
  // Patient Details
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  email: string;

  // Operation Details
  surgeon: string;
  hospital: string;
  operation: string;
  date_of_operation: string;
  operation_reason: string;

  // Patient Medical Details
  height: number;
  weight: number;
  recently_unwell: string;
  previous_anaesthetic: string;
  family_anaesthetic_reaction: string;
  allergies: string;
  regular_medications: string;
  smoke_or_vape: string;
  alcohol_consumption: string;

  // Medical Conditions
  heart_issues: string;
  shortness_of_breath: string;
  lung_issues: string;
  diabetes: string;
  gastrointestinal_issues: string;
  thyroid_disease: string;
  neurological_condition: string;
  rheumatoid_arthritis: string;
  kidney_condition: string;
  blood_clotting: string;
  cancer: string;

  // Other Health Information
  covid_history: string;
  dental_descriptions: string[];
  effective_pain_relievers: string[];
  pain_relievers_to_avoid: string[];
  other_medical_conditions: string;
  risk_score: number;
}
  
  export interface RiskLevel {
    color: string;
    text: string;
  }
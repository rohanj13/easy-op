export interface Assessment {
    id: number;
    patient_name: string;
    age: number;
    weight: number;
    height: number;
    medical_history: string;
    created_at: string;
    risk_score?: number;
  }
  
  export interface RiskLevel {
    color: string;
    text: string;
  }
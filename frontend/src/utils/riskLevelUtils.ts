import { RiskLevel } from '../types/assessment';

export const getRiskLevel = (score?: number): RiskLevel => {
  if (score === undefined) return { color: 'default', text: 'Not Assessed' };
  if (score < 30) return { color: 'success', text: 'Low Risk' };
  if (score < 70) return { color: 'warning', text: 'Medium Risk' };
  return { color: 'error', text: 'High Risk' };
};
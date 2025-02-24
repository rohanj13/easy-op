import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { Assessment } from '../../types/assessment';

export const assessmentApi = {
  getAll: () => api.get<Assessment[]>(ENDPOINTS.PREOPFORMS),
  getRiskAssessment: (id: number) => api.get(ENDPOINTS.RISK_ASSESSMENT(id)),
};
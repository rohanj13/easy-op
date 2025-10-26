import { Api } from './api-types';

// For demo purposes, using a placeholder hospital ID
// In production, this would come from auth context
export const DEMO_HOSPITAL_ID = 'c3fdc359-8423-4c98-9aee-be5deb2c206a';

export const api = new Api({
  baseUrl: 'http://localhost:8000',
  baseApiParams: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Set the hospital ID for multi-tenant support
api.setHospitalId(DEMO_HOSPITAL_ID);

// Helper to set credentials if needed
export const setApiCredentials = (username: string, password: string) => {
  const base64Credentials = btoa(`${username}:${password}`);
  api.setSecurityData({ Authorization: `Basic ${base64Credentials}` });
};

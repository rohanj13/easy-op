import { createContext, useContext, useMemo } from "react";
import { Api } from "../types/types";

type HospitalContextType = {
  hospitalId: string;
  api: Api<unknown>;
};

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospital must be used within HospitalProvider");
  }
  return context;
};

export const HospitalProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: In future, get this from JWT token
  const hospitalId = "3848f807-6608-433b-9288-8d4ac572472f";
  
  const api = useMemo(() => {
    const apiInstance = new Api();
    apiInstance.setHospitalId(hospitalId);
    return apiInstance;
  }, [hospitalId]);

  return (
    <HospitalContext.Provider value={{ hospitalId, api }}>
      {children}
    </HospitalContext.Provider>
  );
};
// App.tsx

import { Routes, Route } from "react-router-dom";
import PatientsScreen from "./pages/PatientsList";
import Dashboard from "./pages/Dashboard";
import CreatePatient from "./pages/PatientForm";
//import DummyScreen from "./screens/DummyScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients" element={<PatientsScreen />} />
      <Route path="/patients/new" element={<CreatePatient />} />
    </Routes>
  );
}

export default App;
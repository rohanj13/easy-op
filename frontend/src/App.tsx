// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import PreopForm from './pages/PreopForm';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDetailsView from './pages/DetailView';

const About = () => <div>About Page</div>;

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/newform" element={<PreopForm/>} />
      <Route path="/doctordashboard" element={<DoctorDashboard/>} />
      <Route path="/assessment/:id" element={<PatientDetailsView/>} />
    </Routes>
  );
};

export default App;
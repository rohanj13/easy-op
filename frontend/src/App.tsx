// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import PreopForm from './pages/PreopForm';
import DoctorDashboard from './pages/DoctorDashboard';

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
    </Routes>
  );
};

export default App;
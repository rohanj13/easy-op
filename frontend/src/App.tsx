import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PreopForm from './pages/PreopForm';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDetailsView from './pages/DetailView';
import ProtectedRoute from './components/common/ProtectedRoute';

const About = () => <div>About Page</div>;

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/newform" element={<PreopForm />} />
      <Route
        path="/doctordashboard"
        element={
          <ProtectedRoute allowedGroups={['doctor', 'nurse']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment/:id"
        element={
          <ProtectedRoute>
            <PatientDetailsView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
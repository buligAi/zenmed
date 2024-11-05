import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Prescriptions from './pages/Prescriptions';
import Patients from './pages/Patients';
import PatientView from './pages/PatientView';
import DoctorProfile from './pages/DoctorProfile';
import Login from './pages/Login';
import LoadingScreen from './components/LoadingScreen';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { user, loading, initialized } = useAuth();

  if (!initialized) {
    return <LoadingScreen message="Initializing application..." />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/" 
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Dashboard />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="patients" element={<Patients />} />
        <Route path="patients/:id" element={<PatientView />} />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
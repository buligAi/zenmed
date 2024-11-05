import { Container, Paper, Title, Text } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import DoctorDashboard from '../components/dashboards/DoctorDashboard';
import PatientDashboard from '../components/dashboards/PatientDashboard';
import PharmacyDashboard from '../components/dashboards/PharmacyDashboard';
import DrugCompanyDashboard from '../components/dashboards/DrugCompanyDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientDashboard />;
      case 'pharmacy':
        return <PharmacyDashboard />;
      case 'drugCompany':
        return <DrugCompanyDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <Paper p="md" ta="center">
            <Text>Please log in to view your dashboard</Text>
          </Paper>
        );
    }
  };

  return (
    <Container size="xl">
      <Title order={2} mb="lg">Dashboard</Title>
      {getDashboardComponent()}
    </Container>
  );
}
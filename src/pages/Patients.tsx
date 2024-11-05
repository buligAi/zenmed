import { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  Button,
  Title,
  Group,
  Text
} from '@mantine/core';
import { IconPlus, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import PatientModal from '../components/patients/PatientModal';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

// Demo data
const demoPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '123-456-7890',
    dateOfBirth: '1980-05-15'
  },
  {
    id: 'P002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '123-456-7891',
    dateOfBirth: '1992-08-22'
  }
];

export default function Patients() {
  const [patients] = useState<Patient[]>(demoPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Patients</Title>
        <Button
          leftSection={<IconPlus size={14} />}
          onClick={() => setIsModalOpen(true)}
        >
          New Patient
        </Button>
      </Group>

      <Paper shadow="xs" p="md">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Date of Birth</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {patients.map((patient) => (
              <Table.Tr key={patient.id}>
                <Table.Td>{patient.id}</Table.Td>
                <Table.Td>{patient.name}</Table.Td>
                <Table.Td>{patient.email}</Table.Td>
                <Table.Td>{patient.phone}</Table.Td>
                <Table.Td>{patient.dateOfBirth}</Table.Td>
                <Table.Td>
                  <Button
                    variant="light"
                    size="xs"
                    leftSection={<IconEye size={14} />}
                    onClick={() => handleViewPatient(patient.id)}
                  >
                    View
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      <PatientModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}
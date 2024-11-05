import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  Button,
  Group,
  Title,
  Text,
  Stack,
  Badge,
  Box,
  Tooltip
} from '@mantine/core';
import { IconPlus, IconPrescription, IconHistory } from '@tabler/icons-react';
import NewPrescriptionModal from '../components/prescriptions/NewPrescriptionModal';
import PatientModal from '../components/patients/PatientModal';
import MedicationHistory from '../components/patients/MedicationHistory';

// Demo data
const demoPatient = {
  id: 'P001',
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '123-456-7890',
  dateOfBirth: '1980-05-15'
};

const demoPrescriptions = [
  {
    id: '1',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: '3x daily',
    duration: '7 days',
    status: 'active',
    createdAt: '2023-11-15',
    refills: 2,
    refillsRemaining: 1,
    quantity: '21 tablets',
    dispensedBy: {
      pharmacyId: 'PH001',
      pharmacyName: 'HealthCare Pharmacy',
      dispensedAt: '2023-11-15T14:30:00Z'
    }
  },
  {
    id: '2',
    medication: 'Metformin',
    dosage: '850mg',
    frequency: '2x daily',
    duration: '30 days',
    status: 'active',
    createdAt: '2023-11-01',
    refills: 3,
    refillsRemaining: 3,
    quantity: '60 tablets',
    dispensedBy: null
  }
];

export default function PatientView() {
  const { id } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState('');

  const handleShowHistory = (medication: string) => {
    setSelectedMedication(medication);
    setShowHistory(true);
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Patient Details</Title>
        <Group>
          <Button
            variant="light"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Patient
          </Button>
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={() => setIsPrescriptionModalOpen(true)}
          >
            New Prescription
          </Button>
        </Group>
      </Group>

      <Paper shadow="xs" p="md" mb="lg">
        <Stack>
          <Title order={3}>Personal Information</Title>
          <Group>
            <Text><b>ID:</b> {demoPatient.id}</Text>
            <Text><b>Name:</b> {demoPatient.name}</Text>
            <Text><b>Email:</b> {demoPatient.email}</Text>
            <Text><b>Phone:</b> {demoPatient.phone}</Text>
            <Text><b>Date of Birth:</b> {demoPatient.dateOfBirth}</Text>
          </Group>
        </Stack>
      </Paper>

      <Paper shadow="xs" p="md">
        <Title order={3} mb="md">Prescriptions History</Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Medication</Table.Th>
              <Table.Th>Dosage</Table.Th>
              <Table.Th>Frequency</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Pharmacy</Table.Th>
              <Table.Th>Refills</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {demoPrescriptions.map((prescription) => (
              <Table.Tr key={prescription.id}>
                <Table.Td>{new Date(prescription.createdAt).toLocaleDateString()}</Table.Td>
                <Table.Td>{prescription.medication}</Table.Td>
                <Table.Td>{prescription.dosage}</Table.Td>
                <Table.Td>{prescription.frequency}</Table.Td>
                <Table.Td>{prescription.duration}</Table.Td>
                <Table.Td>
                  <Badge 
                    color={prescription.status === 'active' ? 'green' : 'gray'}
                  >
                    {prescription.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {prescription.dispensedBy ? (
                    <Tooltip label={`Dispensed on ${new Date(prescription.dispensedBy.dispensedAt).toLocaleString()}`}>
                      <Group gap="xs">
                        <IconPrescription size={14} />
                        <Text size="sm">{prescription.dispensedBy.pharmacyName}</Text>
                      </Group>
                    </Tooltip>
                  ) : (
                    <Button
                      variant="light"
                      size="xs"
                      leftSection={<IconPrescription size={14} />}
                    >
                      Purchase
                    </Button>
                  )}
                </Table.Td>
                <Table.Td>
                  {prescription.refillsRemaining}/{prescription.refills}
                </Table.Td>
                <Table.Td>
                  <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<IconHistory size={14} />}
                    onClick={() => handleShowHistory(prescription.medication)}
                  >
                    View History
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      <PatientModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={demoPatient}
      />

      <NewPrescriptionModal
        open={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patientId={id}
        patientName={demoPatient.name}
      />

      <MedicationHistory
        open={showHistory}
        onClose={() => setShowHistory(false)}
        medication={selectedMedication}
        patientName={demoPatient.name}
      />
    </Container>
  );
}
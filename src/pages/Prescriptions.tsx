import { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  Button,
  Group,
  Title,
  Badge,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { IconPlus, IconPrinter, IconQrcode } from '@tabler/icons-react';
import NewPrescriptionModal from '../components/prescriptions/NewPrescriptionModal';
import PrescriptionQR from '../components/prescriptions/PrescriptionQR';
import PrescriptionPrint from '../components/prescriptions/PrescriptionPrint';
import { generatePrescriptionId } from '../utils/prescriptionId';
import { Prescription } from '../types/prescription';

const demoDoctor = {
  name: 'Dr. John Doe',
  prcId: 'PRC-12345',
  specialization: 'Internal Medicine',
  clinicAddress: '123 Medical Plaza, Manila',
  signature: '/signatures/doctor-signature.png',
  avatar: null
};

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleOpenQR = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleOpenPrint = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsPrintModalOpen(true);
  };

  const handleCreatePrescription = (newPrescription: Omit<Prescription, 'id' | 'createdAt' | 'status'>) => {
    const prescription: Prescription = {
      ...newPrescription,
      id: generatePrescriptionId(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setPrescriptions(prev => [...prev, prescription]);
    setIsModalOpen(false);
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Prescriptions</Title>
        <Button
          leftSection={<IconPlus size={14} />}
          onClick={() => setIsModalOpen(true)}
        >
          New Prescription
        </Button>
      </Group>

      <Paper shadow="xs" p="md">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Prescription ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Medication</Table.Th>
              <Table.Th>Dosage</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {prescriptions.map((prescription) => (
              <Table.Tr key={prescription.id}>
                <Table.Td>{prescription.id}</Table.Td>
                <Table.Td>{new Date(prescription.createdAt).toLocaleDateString()}</Table.Td>
                <Table.Td>{prescription.patientName}</Table.Td>
                <Table.Td>{prescription.medication}</Table.Td>
                <Table.Td>{prescription.dosage}</Table.Td>
                <Table.Td>{prescription.duration}</Table.Td>
                <Table.Td>
                  <Badge color={prescription.status === 'active' ? 'green' : 'gray'}>
                    {prescription.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Tooltip label="View QR Code">
                      <ActionIcon
                        variant="light"
                        onClick={() => handleOpenQR(prescription)}
                      >
                        <IconQrcode size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Print Prescription">
                      <ActionIcon
                        variant="light"
                        onClick={() => handleOpenPrint(prescription)}
                      >
                        <IconPrinter size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      <NewPrescriptionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePrescription}
      />

      <PrescriptionQR
        prescription={selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
      />

      {selectedPrescription && (
        <PrescriptionPrint
          open={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          prescription={selectedPrescription}
          doctor={demoDoctor}
        />
      )}
    </Container>
  );
}
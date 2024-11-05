import {
  Modal,
  Table,
  Title,
  Text,
  Group,
  Stack
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface Props {
  open: boolean;
  onClose: () => void;
  medication: string;
  patientName: string;
}

// Demo purchase history data
const demoPurchaseHistory = [
  {
    id: '1',
    date: '2023-11-15T14:30:00Z',
    pharmacy: 'HealthCare Pharmacy',
    quantity: '30 tablets',
    prescriptionId: 'RX123',
    cost: '$25.00',
    insurance: 'BlueCross',
    copay: '$5.00'
  },
  {
    id: '2',
    date: '2023-10-15T10:15:00Z',
    pharmacy: 'City Drugs',
    quantity: '30 tablets',
    prescriptionId: 'RX122',
    cost: '$25.00',
    insurance: 'BlueCross',
    copay: '$5.00'
  }
];

export default function MedicationHistory({ open, onClose, medication, patientName }: Props) {
  return (
    <Modal 
      opened={open} 
      onClose={onClose}
      title="Medication Purchase History"
      size="lg"
    >
      <Stack>
        <Group>
          <Text fw={500}>{medication}</Text>
          <Text c="dimmed">-</Text>
          <Text>{patientName}</Text>
        </Group>
        
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Pharmacy</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Prescription ID</Table.Th>
              <Table.Th>Cost</Table.Th>
              <Table.Th>Insurance</Table.Th>
              <Table.Th>Copay</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {demoPurchaseHistory.map((purchase) => (
              <Table.Tr key={purchase.id}>
                <Table.Td>{new Date(purchase.date).toLocaleDateString()}</Table.Td>
                <Table.Td>{purchase.pharmacy}</Table.Td>
                <Table.Td>{purchase.quantity}</Table.Td>
                <Table.Td>{purchase.prescriptionId}</Table.Td>
                <Table.Td>{purchase.cost}</Table.Td>
                <Table.Td>{purchase.insurance}</Table.Td>
                <Table.Td>{purchase.copay}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Modal>
  );
}
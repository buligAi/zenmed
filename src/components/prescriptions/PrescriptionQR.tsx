import {
  Modal,
  Button,
  Box,
  Title,
  Text,
  Stack,
  Group
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import QRCode from 'qrcode.react';
import { Prescription } from '../../types/prescription';

interface Props {
  prescription: Prescription | null;
  onClose: () => void;
}

export default function PrescriptionQR({ prescription, onClose }: Props) {
  if (!prescription) return null;

  const prescriptionData = JSON.stringify({
    id: prescription.id,
    patient: prescription.patientName,
    medication: prescription.medication,
    dosage: prescription.dosage,
    frequency: prescription.frequency,
    duration: prescription.duration
  });

  return (
    <Modal 
      opened={!!prescription} 
      onClose={onClose}
      title="Prescription QR Code"
      centered
    >
      <Stack align="center" p="md">
        <QRCode value={prescriptionData} size={256} />
        <Group>
          <Text fw={700} ff="monospace">
            ID: {prescription.id}
          </Text>
        </Group>
        <Text size="sm" c="dimmed" ta="center">
          Scan this QR code or enter the ID at the pharmacy
        </Text>
      </Stack>
    </Modal>
  );
}
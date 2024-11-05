import {
  Modal,
  Button,
  Box,
  Title,
  Text,
  Group,
  Avatar,
  Divider,
  Grid,
  Paper,
  Stack
} from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import QRCode from 'qrcode.react';
import { Prescription } from '../../types/prescription';

interface Props {
  open: boolean;
  onClose: () => void;
  prescription: Prescription;
  doctor: {
    name: string;
    prcId: string;
    specialization: string;
    clinicAddress: string;
    signature: string;
    avatar: string | null;
  };
}

export default function PrescriptionPrint({ open, onClose, prescription, doctor }: Props) {
  const handlePrint = () => {
    window.print();
  };

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
      opened={open} 
      onClose={onClose} 
      size="lg"
      title="Print Prescription"
    >
      <Button
        leftSection={<IconPrinter size={14} />}
        onClick={handlePrint}
        mb="md"
        className="print-hidden"
      >
        Print
      </Button>

      <Paper p="lg" withBorder>
        {/* Header */}
        <Grid align="center" mb="md">
          {/* Left side - Doctor's Logo/Avatar */}
          <Grid.Col span={2}>
            <Avatar
              src={doctor.avatar}
              size={80}
              radius={80}
              styles={{
                root: {
                  border: '2px solid var(--mantine-color-blue-6)'
                }
              }}
            >
              {doctor.name[0]}
            </Avatar>
          </Grid.Col>

          {/* Center - Doctor's Info */}
          <Grid.Col span={7}>
            <Stack align="center" gap="xs">
              <Title order={3}>{doctor.name}</Title>
              <Text>{doctor.specialization}</Text>
              <Text size="sm">PRC License No: {doctor.prcId}</Text>
              <Text size="sm">{doctor.clinicAddress}</Text>
            </Stack>
          </Grid.Col>

          {/* Right side - Prescription ID and QR */}
          <Grid.Col span={3}>
            <Stack align="flex-end">
              <Text size="sm" fw={500}>
                Prescription #: {prescription.id}
              </Text>
              <QRCode 
                value={prescriptionData}
                size={80}
                level="H"
                includeMargin={true}
              />
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="md" />

        {/* Patient Information */}
        <Grid mb="lg">
          <Grid.Col span={6}>
            <Text><b>Patient Name:</b> {prescription.patientName}</Text>
            <Text><b>Patient ID:</b> {prescription.patientId}</Text>
            <Text><b>Age:</b> {prescription.patientAge} years</Text>
            <Text><b>Gender:</b> {prescription.patientGender}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text><b>Address:</b> {prescription.patientAddress}</Text>
            <Text><b>Date:</b> {new Date(prescription.createdAt).toLocaleDateString()}</Text>
          </Grid.Col>
        </Grid>

        {/* Rx Symbol */}
        <Text fz={32} ff="serif" mb="md">℞</Text>

        {/* Prescription Details */}
        <Box pl="lg" mb="xl">
          <Title order={4}>{prescription.medication}</Title>
          <Text>Dosage: {prescription.dosage}</Text>
          <Text>Frequency: {prescription.frequency}</Text>
          <Text>Duration: {prescription.duration}</Text>
          {prescription.notes && (
            <Text mt="md">Notes: {prescription.notes}</Text>
          )}
        </Box>

        {/* Signature */}
        <Stack align="flex-end" mt="xl">
          <img
            src={doctor.signature}
            alt="Doctor's signature"
            style={{ maxWidth: 200, maxHeight: 100 }}
          />
          <Text>{doctor.name}</Text>
          <Text size="sm">License No: {doctor.prcId}</Text>
        </Stack>

        {/* Footer */}
        <Box mt="xl">
          <Divider mb="md" />
          <Text ta="center" size="sm" c="dimmed">
            This prescription is valid for 6 months from the date of issuance unless otherwise specified.
          </Text>
          <Text ta="center" size="xs" c="dimmed">
            This is a digital prescription generated by ZenMed Healthcare System
          </Text>
        </Box>
      </Paper>
    </Modal>
  );
}
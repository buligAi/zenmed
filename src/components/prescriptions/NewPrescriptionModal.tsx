import {
  Modal,
  Button,
  TextInput,
  Grid,
  Select,
  Textarea,
  Stack,
  NumberInput
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { medications } from '../../data/medications';
import { Prescription } from '../../types/prescription';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (prescription: Omit<Prescription, 'id' | 'createdAt' | 'status'>) => void;
  patientId?: string;
  patientName?: string;
}

export default function NewPrescriptionModal({ open, onClose, onSubmit, patientId, patientName }: Props) {
  const [prescription, setPrescription] = useState<Omit<Prescription, 'id' | 'createdAt' | 'status'>>({
    patientName: patientName || '',
    patientId: patientId || '',
    patientAge: 0,
    patientGender: 'Male',
    patientAddress: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: '',
    doctorId: '1'
  });

  useEffect(() => {
    if (patientName && patientId) {
      setPrescription(prev => ({
        ...prev,
        patientName,
        patientId
      }));
    }
  }, [patientName, patientId]);

  const handleMedicationChange = (value: string | null) => {
    if (value) {
      const selectedMed = medications.find(med => med.name === value);
      if (selectedMed) {
        setPrescription({
          ...prescription,
          medication: selectedMed.name,
          dosage: selectedMed.defaultDosage,
          frequency: selectedMed.defaultFrequency,
          duration: selectedMed.defaultDuration
        });
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(prescription);
    onClose();
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="New Prescription"
      size="lg"
    >
      <Stack gap="md">
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Patient Name"
              value={prescription.patientName}
              onChange={(e) => setPrescription({ ...prescription, patientName: e.target.value })}
              disabled={!!patientName}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Patient ID"
              value={prescription.patientId}
              onChange={(e) => setPrescription({ ...prescription, patientId: e.target.value })}
              disabled={!!patientId}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Age"
              value={prescription.patientAge}
              onChange={(value) => setPrescription({ ...prescription, patientAge: value || 0 })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Gender"
              value={prescription.patientGender}
              onChange={(value) => setPrescription({ ...prescription, patientGender: value as 'Male' | 'Female' | 'Other' })}
              data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' }
              ]}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Address"
              value={prescription.patientAddress}
              onChange={(e) => setPrescription({ ...prescription, patientAddress: e.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="Medication"
              data={medications.map(med => ({ value: med.name, label: med.name }))}
              onChange={handleMedicationChange}
              searchable
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Dosage"
              value={prescription.dosage}
              onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Frequency"
              value={prescription.frequency}
              onChange={(e) => setPrescription({ ...prescription, frequency: e.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Duration"
              value={prescription.duration}
              onChange={(e) => setPrescription({ ...prescription, duration: e.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Notes"
              value={prescription.notes}
              onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
              rows={4}
            />
          </Grid.Col>
        </Grid>

        <Grid justify="flex-end">
          <Grid.Col span="content">
            <Button variant="subtle" onClick={onClose} mr="xs">Cancel</Button>
            <Button onClick={handleSubmit}>Create Prescription</Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
}
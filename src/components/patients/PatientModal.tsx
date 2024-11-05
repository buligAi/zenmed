import {
  Modal,
  Button,
  TextInput,
  Grid,
  Stack
} from '@mantine/core';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  patient?: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
}

export default function PatientModal({ open, onClose, patient }: Props) {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    dateOfBirth: patient?.dateOfBirth || ''
  });

  const handleSubmit = () => {
    // In a real app, this would make an API call
    console.log('Patient data:', formData);
    onClose();
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={patient ? 'Edit Patient' : 'New Patient'}
      size="md"
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <Stack>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </Grid.Col>
          </Grid>

          <Grid justify="flex-end">
            <Grid.Col span="content">
              <Button variant="subtle" onClick={onClose} mr="xs">
                Cancel
              </Button>
              <Button type="submit">
                {patient ? 'Save Changes' : 'Create Patient'}
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
}
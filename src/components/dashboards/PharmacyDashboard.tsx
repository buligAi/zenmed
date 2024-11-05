import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Title,
  TextInput,
  Button,
  Group,
  Text
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function PharmacyDashboard() {
  const [prescriptionId, setPrescriptionId] = useState('');

  const handleVerifyPrescription = () => {
    if (prescriptionId.trim()) {
      // Handle prescription verification
      console.log('Verifying prescription:', prescriptionId);
    }
  };

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col>
          <Paper p="md" withBorder>
            <Title order={3} mb="md">
              Verify & Dispense Prescription
            </Title>
            <Group>
              <TextInput
                placeholder="Enter Prescription ID"
                value={prescriptionId}
                onChange={(e) => setPrescriptionId(e.target.value)}
                leftSection={<IconSearch size={14} />}
                style={{ flex: 1 }}
              />
              <Button
                onClick={handleVerifyPrescription}
                disabled={!prescriptionId.trim()}
              >
                Verify & Dispense
              </Button>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col>
          <Paper p="md" withBorder>
            <Title order={3} mb="md">
              Recent Activity
            </Title>
            <Group>
              <Text c="dimmed">Pending Orders: 5</Text>
              <Text c="dimmed">Today's Transactions: 23</Text>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
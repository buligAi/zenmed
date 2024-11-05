import { Card, Group, Text, SimpleGrid } from '@mantine/core';

export default function DoctorStats() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
      <Card shadow="sm" padding="lg">
        <Group>
          <Text size="xl" fw={700}>156</Text>
          <Text size="sm" c="dimmed">Total Patients</Text>
        </Group>
      </Card>
      <Card shadow="sm" padding="lg">
        <Group>
          <Text size="xl" fw={700}>32</Text>
          <Text size="sm" c="dimmed">Active Prescriptions</Text>
        </Group>
      </Card>
      <Card shadow="sm" padding="lg">
        <Group>
          <Text size="xl" fw={700}>8</Text>
          <Text size="sm" c="dimmed">Today's Appointments</Text>
        </Group>
      </Card>
      <Card shadow="sm" padding="lg">
        <Group>
          <Text size="xl" fw={700}>1,250</Text>
          <Text size="sm" c="dimmed">Reward Points</Text>
        </Group>
      </Card>
    </SimpleGrid>
  );
}
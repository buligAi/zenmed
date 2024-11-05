import { Grid, Paper, Title, Text, Stack, Badge, Group } from '@mantine/core';
import { IconPill, IconCalendar } from '@tabler/icons-react';

// Demo data
const activePrescriptions = [
  {
    id: 'RX001',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: '3x daily',
    remainingDays: 5
  },
  {
    id: 'RX002',
    medication: 'Metformin',
    dosage: '850mg',
    frequency: '2x daily',
    remainingDays: 25
  }
];

const upcomingAppointments = [
  {
    id: 'APT001',
    doctor: 'Dr. John Doe',
    date: '2023-12-01',
    time: '10:00 AM',
    type: 'Follow-up'
  }
];

export default function PatientDashboard() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Paper p="md" withBorder>
          <Stack>
            <Title order={3}>Active Prescriptions</Title>
            {activePrescriptions.map((prescription) => (
              <Paper key={prescription.id} p="sm" withBorder>
                <Group position="apart">
                  <Group>
                    <IconPill size={20} />
                    <Stack spacing={4}>
                      <Text fw={500}>{prescription.medication}</Text>
                      <Text size="sm" c="dimmed">
                        {prescription.dosage} - {prescription.frequency}
                      </Text>
                    </Stack>
                  </Group>
                  <Badge color={prescription.remainingDays <= 7 ? 'red' : 'blue'}>
                    {prescription.remainingDays} days remaining
                  </Badge>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12}>
        <Paper p="md" withBorder>
          <Stack>
            <Title order={3}>Upcoming Appointments</Title>
            {upcomingAppointments.map((appointment) => (
              <Paper key={appointment.id} p="sm" withBorder>
                <Group position="apart">
                  <Group>
                    <IconCalendar size={20} />
                    <Stack spacing={4}>
                      <Text fw={500}>{appointment.doctor}</Text>
                      <Text size="sm" c="dimmed">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </Text>
                    </Stack>
                  </Group>
                  <Badge>{appointment.type}</Badge>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
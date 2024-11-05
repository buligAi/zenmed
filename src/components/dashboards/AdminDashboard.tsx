import { Grid, Paper, Title, Text } from '@mantine/core';

export default function AdminDashboard() {
  return (
    <Grid>
      <Grid.Col>
        <Paper p="md">
          <Title order={3} mb="md">
            System Overview
          </Title>
          <Text c="dimmed">Total Users: 1,245</Text>
          <Text c="dimmed">Active Doctors: 89</Text>
          <Text c="dimmed">Registered Pharmacies: 34</Text>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
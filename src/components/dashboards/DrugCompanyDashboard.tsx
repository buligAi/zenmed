import { Grid, Paper, Title, Text } from '@mantine/core';

export default function DrugCompanyDashboard() {
  return (
    <Grid>
      <Grid.Col>
        <Paper p="md">
          <Title order={3} mb="md">
            Drug Company Overview
          </Title>
          <Text c="dimmed">Total Products: 156</Text>
          <Text c="dimmed">Active Distribution: 89 pharmacies</Text>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
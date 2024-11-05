import { Grid } from '@mantine/core';
import DoctorStats from '../doctor/DoctorStats';
import DoctorTable from '../doctor/DoctorTable';
import PrescriptionAnalytics from '../doctor/PrescriptionAnalytics';
import PerformanceMetrics from '../doctor/PerformanceMetrics';
import RewardsOverview from '../rewards/RewardsOverview';

export default function DoctorDashboard() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <DoctorStats />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <PrescriptionAnalytics />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <RewardsOverview />
      </Grid.Col>
      <Grid.Col span={12}>
        <PerformanceMetrics />
      </Grid.Col>
      <Grid.Col span={12}>
        <DoctorTable />
      </Grid.Col>
    </Grid>
  );
}
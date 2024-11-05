import { Card, Text } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', prescriptions: 65 },
  { month: 'Feb', prescriptions: 59 },
  { month: 'Mar', prescriptions: 80 },
  { month: 'Apr', prescriptions: 81 },
  { month: 'May', prescriptions: 56 },
  { month: 'Jun', prescriptions: 55 },
];

export default function PrescriptionAnalytics() {
  return (
    <Card shadow="sm" padding="lg" h={400}>
      <Text size="lg" fw={500} mb="md">Prescription Analytics</Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="prescriptions" fill="#228be6" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
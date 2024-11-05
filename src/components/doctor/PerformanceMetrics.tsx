import { Card, Text, Progress, Group, SimpleGrid } from '@mantine/core';

export default function PerformanceMetrics() {
  const metrics = [
    { label: 'Patient Satisfaction', value: 92 },
    { label: 'Prescription Accuracy', value: 98 },
    { label: 'Follow-up Rate', value: 85 },
    { label: 'Documentation Quality', value: 90 }
  ];

  return (
    <Card shadow="sm" padding="lg">
      <Text size="lg" fw={500} mb="xl">Performance Metrics</Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {metrics.map((metric) => (
          <div key={metric.label}>
            <Group justify="space-between" mb="xs">
              <Text size="sm">{metric.label}</Text>
              <Text size="sm" fw={500}>{metric.value}%</Text>
            </Group>
            <Progress value={metric.value} color="blue" size="md" />
          </div>
        ))}
      </SimpleGrid>
    </Card>
  );
}
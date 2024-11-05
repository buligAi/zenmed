import { Card, Text, Group, Stack, Button } from '@mantine/core';

export default function RewardsOverview() {
  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Text size="lg" fw={500}>Rewards Program</Text>
        
        <Group>
          <div>
            <Text size="sm" c="dimmed">Available Points</Text>
            <Text size="xl" fw={700}>1,250</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">Tier Status</Text>
            <Text size="xl" fw={700}>Gold</Text>
          </div>
        </Group>

        <Button variant="light">View Rewards Catalog</Button>
      </Stack>
    </Card>
  );
}
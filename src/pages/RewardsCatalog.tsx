import {
  Grid,
  Title,
  Card,
  Button,
  Box,
  Badge,
  Select,
  Text,
  Image,
  Stack
} from '@mantine/core';
import { useState } from 'react';

const categories = [
  'All',
  'Travel',
  'Electronics',
  'Professional Development',
  'Medical Equipment',
  'Conference Passes'
];

const rewards = [
  {
    id: 1,
    name: 'International Medical Conference',
    category: 'Conference Passes',
    points: 5000,
    image: '/rewards/conference.jpg',
    description: 'Access to premier medical conference including travel and accommodation'
  },
  {
    id: 2,
    name: 'Premium Tablet Device',
    category: 'Electronics',
    points: 3500,
    image: '/rewards/tablet.jpg',
    description: 'Latest tablet for medical documentation and research'
  },
  {
    id: 3,
    name: 'Advanced Medical Training',
    category: 'Professional Development',
    points: 4000,
    image: '/rewards/training.jpg',
    description: 'Specialized medical training program with certification'
  }
];

export default function RewardsCatalog() {
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('points');

  const filteredRewards = rewards.filter(
    reward => category === 'All' || reward.category === category
  );

  return (
    <Box>
      <Title order={2} mb="lg">
        Rewards Catalog
      </Title>

      <Group mb="xl">
        <Select
          label="Category"
          value={category}
          onChange={(value) => setCategory(value || 'All')}
          data={categories}
          w={200}
        />

        <Select
          label="Sort By"
          value={sortBy}
          onChange={(value) => setSortBy(value || 'points')}
          w={200}
          data={[
            { value: 'points', label: 'Points: Low to High' },
            { value: 'points-desc', label: 'Points: High to Low' },
            { value: 'name', label: 'Name' }
          ]}
        />
      </Group>

      <Grid>
        {filteredRewards.map((reward) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={reward.id}>
            <Card shadow="sm">
              <Card.Section>
                <Image
                  src={reward.image}
                  height={200}
                  alt={reward.name}
                />
              </Card.Section>

              <Stack mt="md">
                <Title order={4}>{reward.name}</Title>
                <Badge color="blue">
                  {reward.points} points
                </Badge>
                <Text size="sm" c="dimmed">
                  {reward.description}
                </Text>
                <Button onClick={() => {/* Handle redemption */}}>
                  Redeem Reward
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
import {
  Grid,
  Paper,
  Title,
  Table,
  Button,
  Box,
  Badge,
  Text,
  Group
} from '@mantine/core';
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';

const medications = [
  {
    id: 'MED001',
    name: 'Amoxicillin',
    category: 'Antibiotics',
    stock: 500,
    unit: 'tablets',
    minStock: 100,
    pointsPerUnit: 2,
    expiryDate: '2024-12-31'
  },
  {
    id: 'MED002',
    name: 'Metformin',
    category: 'Diabetes',
    stock: 75,
    unit: 'tablets',
    minStock: 100,
    pointsPerUnit: 3,
    expiryDate: '2024-11-30'
  },
  {
    id: 'MED003',
    name: 'Lisinopril',
    category: 'Cardiovascular',
    stock: 300,
    unit: 'tablets',
    minStock: 50,
    pointsPerUnit: 2,
    expiryDate: '2024-10-31'
  }
];

export default function MedicationInventory() {
  return (
    <Grid>
      <Grid.Col>
        <Title order={2} mb="lg">
          Medication Inventory
        </Title>
      </Grid.Col>

      <Grid.Col>
        <Paper>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Medication</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th ta="right">Stock Level</Table.Th>
                <Table.Th ta="right">Points/Unit</Table.Th>
                <Table.Th>Expiry Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {medications.map((med) => (
                <Table.Tr key={med.id}>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text fw={500}>{med.name}</Text>
                      <Text size="xs" c="dimmed">
                        {med.id}
                      </Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>{med.category}</Table.Td>
                  <Table.Td ta="right">
                    <Group justify="flex-end" gap="xs">
                      {med.stock < med.minStock && (
                        <IconAlertTriangle color="var(--mantine-color-yellow-6)" size={16} />
                      )}
                      <Text>
                        {med.stock} {med.unit}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Badge color="blue">
                      {med.pointsPerUnit} pts
                    </Badge>
                  </Table.Td>
                  <Table.Td>{med.expiryDate}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={med.stock >= med.minStock ? 'green' : 'yellow'}
                      leftSection={med.stock >= med.minStock ? 
                        <IconCircleCheck size={14} /> : 
                        <IconAlertTriangle size={14} />
                      }
                    >
                      {med.stock >= med.minStock ? 'In Stock' : 'Low Stock'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Button
                      variant="light"
                      size="xs"
                      onClick={() => {/* Handle restock */}}
                    >
                      Restock
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
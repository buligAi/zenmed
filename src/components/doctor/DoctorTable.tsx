import { Table, Card, Text } from '@mantine/core';

export default function DoctorTable() {
  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', patients: 156, prescriptions: 423 },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrics', patients: 203, prescriptions: 567 },
    { id: 3, name: 'Dr. Mike Johnson', specialty: 'Neurology', patients: 98, prescriptions: 234 },
  ];

  return (
    <Card shadow="sm" padding="lg">
      <Text size="lg" fw={500} mb="md">Doctor Profiles</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Specialty</Table.Th>
            <Table.Th>Patients</Table.Th>
            <Table.Th>Prescriptions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {doctors.map((doctor) => (
            <Table.Tr key={doctor.id}>
              <Table.Td>{doctor.name}</Table.Td>
              <Table.Td>{doctor.specialty}</Table.Td>
              <Table.Td>{doctor.patients}</Table.Td>
              <Table.Td>{doctor.prescriptions}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

// Demo data - in real app, this would come from API
const dispensedPrescriptions = [
  {
    id: 'RX123456',
    patientName: 'John Smith',
    medication: 'Amoxicillin 500mg',
    dispensedDate: '2023-11-20',
    lotNumber: 'LOT123',
    expiryDate: '2024-11-20',
    quantity: '21 tablets',
    pharmacist: 'Jane Doe'
  },
  {
    id: 'RX123457',
    patientName: 'Sarah Johnson',
    medication: 'Metformin 850mg',
    dispensedDate: '2023-11-19',
    lotNumber: 'LOT124',
    expiryDate: '2024-10-15',
    quantity: '60 tablets',
    pharmacist: 'Jane Doe'
  }
];

export default function DispensedPrescriptions() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recently Dispensed Prescriptions
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prescription ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Dispensed Date</TableCell>
              <TableCell>Lot Number</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispensedPrescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>{prescription.id}</TableCell>
                <TableCell>{prescription.patientName}</TableCell>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.dispensedDate}</TableCell>
                <TableCell>{prescription.lotNumber}</TableCell>
                <TableCell>{prescription.expiryDate}</TableCell>
                <TableCell>{prescription.quantity}</TableCell>
                <TableCell>
                  <Chip 
                    label="Dispensed" 
                    color="success" 
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
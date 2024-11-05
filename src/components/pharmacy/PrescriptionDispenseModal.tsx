import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Divider,
  Alert
} from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

interface Props {
  open: boolean;
  onClose: () => void;
  prescriptionId: string;
}

// Demo prescription data - in real app, this would come from API
const demoPrescription = {
  id: 'RX123456',
  patientName: 'John Smith',
  medication: 'Amoxicillin',
  dosage: '500mg',
  frequency: '3x daily',
  duration: '7 days',
  doctor: 'Dr. Jane Wilson',
  dateIssued: '2023-11-20',
  status: 'active'
};

export default function PrescriptionDispenseModal({ open, onClose, prescriptionId }: Props) {
  const [lotNumber, setLotNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDispense = async () => {
    try {
      setIsSubmitting(true);
      // In a real app, make API call to record dispensing
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalPharmacyIcon /> Dispense Prescription
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info">
              Verify all prescription details carefully before dispensing
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Prescription Details</Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>ID:</strong> {demoPrescription.id}</Typography>
                  <Typography><strong>Patient:</strong> {demoPrescription.patientName}</Typography>
                  <Typography><strong>Doctor:</strong> {demoPrescription.doctor}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Medication:</strong> {demoPrescription.medication}</Typography>
                  <Typography><strong>Dosage:</strong> {demoPrescription.dosage}</Typography>
                  <Typography><strong>Duration:</strong> {demoPrescription.duration}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Dispensing Details</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Lot Number"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quantity Dispensed"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleDispense}
          disabled={isSubmitting || !lotNumber || !expiryDate || !quantity}
        >
          {isSubmitting ? 'Recording...' : 'Record Dispensing'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
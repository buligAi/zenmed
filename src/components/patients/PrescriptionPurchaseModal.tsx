import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface Props {
  open: boolean;
  onClose: () => void;
  prescription: {
    id: string;
    medication: string;
    dosage: string;
    quantity: string;
  };
}

// Demo data - in real app, this would come from API
const demoPharmacies = [
  {
    id: 'PH001',
    name: 'HealthCare Pharmacy',
    address: '123 Medical Plaza, Manila',
    distance: '0.5 km',
    price: 250.00,
    stock: 100,
    rating: 4.5,
    deliveryAvailable: true
  },
  {
    id: 'PH002',
    name: 'City Drugs',
    address: '456 Health Street, Manila',
    distance: '1.2 km',
    price: 245.00,
    stock: 75,
    rating: 4.3,
    deliveryAvailable: true
  },
  {
    id: 'PH003',
    name: 'Community Pharmacy',
    address: '789 Care Road, Manila',
    distance: '2.1 km',
    price: 240.00,
    stock: 50,
    rating: 4.4,
    deliveryAvailable: false
  }
];

export default function PrescriptionPurchaseModal({ open, onClose, prescription }: Props) {
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState('pickup');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  const handlePurchase = async () => {
    // In a real app, make API call to process purchase
    console.log('Processing purchase:', {
      prescription,
      pharmacyId: selectedPharmacy,
      fulfillmentMethod
    });
    onClose();
  };

  const sortPharmacies = (pharmacies: typeof demoPharmacies) => {
    return pharmacies.sort((a, b) => {
      if (sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      }
      return a.price - b.price;
    });
  };

  const filteredPharmacies = sortPharmacies(
    demoPharmacies.filter(pharmacy => 
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Purchase Prescription</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {prescription.medication} - {prescription.dosage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {prescription.quantity}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Search pharmacies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant={sortBy === 'distance' ? 'contained' : 'outlined'}
                onClick={() => setSortBy('distance')}
                startIcon={<LocationOnIcon />}
              >
                Nearest
              </Button>
              <Button
                variant={sortBy === 'price' ? 'contained' : 'outlined'}
                onClick={() => setSortBy('price')}
              >
                Best Price
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <List>
              {filteredPharmacies.map((pharmacy) => (
                <ListItem
                  key={pharmacy.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: selectedPharmacy === pharmacy.id ? 'action.selected' : 'background.paper'
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StorefrontIcon color="action" />
                        <Typography variant="subtitle1">{pharmacy.name}</Typography>
                        <Chip
                          size="small"
                          label={`₱${pharmacy.price.toFixed(2)}`}
                          color="primary"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2">{pharmacy.address}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {pharmacy.distance}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Stock: {pharmacy.stock}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Rating: {pharmacy.rating}⭐
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant={selectedPharmacy === pharmacy.id ? "contained" : "outlined"}
                      onClick={() => setSelectedPharmacy(pharmacy.id)}
                    >
                      Select
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>

          {selectedPharmacy && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Fulfillment Method
                </Typography>
                <RadioGroup
                  value={fulfillmentMethod}
                  onChange={(e) => setFulfillmentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="pickup"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StorefrontIcon />
                        <Typography>Pickup from Store</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="delivery"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalShippingIcon />
                        <Typography>Delivery</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handlePurchase}
          disabled={!selectedPharmacy}
        >
          Complete Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
}
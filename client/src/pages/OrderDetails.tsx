import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, CircularProgress, Divider, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import axios from 'axios';
import { ORDERS_API_URL } from '../constants/api';

interface OrderDetailsDto {
  id: string;
  orderNumber: string;
  senderCity: string;
  senderAddressLine: string;
  receiverCity: string;
  receiverAddressLine: string;
  weight: number;
  pickupDate: string;
}

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetailsDto | null>(null);

  useEffect(() => {
    axios.get(`${ORDERS_API_URL}/${id}`)
      .then(res => setOrder(res.data))
      .catch(console.error);
  }, [id]);

  if (!order) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingIcon fontSize="large" color="primary" />
          Order Details
        </Typography>
        <Chip label={`ID: ${order.id}`} color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
      </Box>

      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="h6">Sender</Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{order.senderCity}</Typography>
              <Typography variant="body2" color="text.secondary">{order.senderAddressLine}</Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Receiver</Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{order.receiverCity}</Typography>
              <Typography variant="body2" color="text.secondary">{order.receiverAddressLine}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', gap: 6 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Weight</Typography>
              <Typography variant="h6">{order.weight} kg</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Pickup Date</Typography>
              <Typography variant="h6">{new Date(order.pickupDate).toLocaleDateString()}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mt: 3 }} 
        variant="outlined"
      >
        Back to Orders
      </Button>
    </Box>
  );
}

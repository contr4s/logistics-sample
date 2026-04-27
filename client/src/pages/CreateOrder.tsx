import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ORDERS_API_URL } from '../constants/api';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [senderCity, setSenderCity] = useState('');
  const [senderAddressLine, setSenderAddressLine] = useState('');
  const [receiverCity, setReceiverCity] = useState('');
  const [receiverAddressLine, setReceiverAddressLine] = useState('');
  const [weight, setWeight] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(ORDERS_API_URL, {
        senderCity,
        senderAddressLine,
        receiverCity,
        receiverAddressLine,
        weight: parseFloat(weight),
        pickupDate: new Date(pickupDate).toISOString(),
      });
      navigate('/');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Create New Order</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField required label="Sender City" value={senderCity} onChange={e => setSenderCity(e.target.value)} />
        <TextField required label="Sender Address" value={senderAddressLine} onChange={e => setSenderAddressLine(e.target.value)} />
        <TextField required label="Receiver City" value={receiverCity} onChange={e => setReceiverCity(e.target.value)} />
        <TextField required label="Receiver Address" value={receiverAddressLine} onChange={e => setReceiverAddressLine(e.target.value)} />
        <TextField required type="number" slotProps={{ htmlInput: { step: '0.1' } }} label="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
        <TextField required type="date" label="Pickup Date" slotProps={{ inputLabel: { shrink: true } }} value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
        
        <Button variant="contained" type="submit">Submit Order</Button>
      </Box>
    </Container>
  );
}

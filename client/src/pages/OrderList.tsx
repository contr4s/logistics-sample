import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ORDERS_API_URL } from '../constants/api';

interface Order {
  id: string;
  orderNumber: string;
  senderCity: string;
  senderAddressLine: string;
  receiverCity: string;
  receiverAddressLine: string;
  weight: number;
  pickupDate: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ORDERS_API_URL)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Pickup Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id} 
                hover 
                onClick={() => navigate(`/orders/${order.id}`)}
                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Chip 
                    label={order.id.split('-')[0]} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                    sx={{ fontFamily: 'monospace' }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{order.senderCity}</Typography>
                  <Typography variant="caption" color="text.secondary">{order.senderAddressLine}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{order.receiverCity}</Typography>
                  <Typography variant="caption" color="text.secondary">{order.receiverAddressLine}</Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{order.weight} kg</TableCell>
                <TableCell color="text.secondary">{new Date(order.pickupDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

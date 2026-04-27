import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import OrderList from './pages/OrderList';
import CreateOrder from './pages/CreateOrder';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Logistics System
            </Typography>
            <Button color="inherit" component={Link} to="/">Orders</Button>
            <Button color="inherit" component={Link} to="/create">Create Order</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/create" element={<CreateOrder />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;

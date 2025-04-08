import { Routes, Route } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import StoresPage from './pages/StoresPage';
import SalesPage from './pages/SalesPage';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <App />
</LocalizationProvider>
function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Store Admin
          </Typography>
          <Button color="inherit" component={Link} to="/customers">Customers</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/stores">Stores</Button>
          <Button color="inherit" component={Link} to="/sales">Sales</Button>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/" element={<CustomersPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
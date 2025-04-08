import { Modal, Box, TextField, Button, Typography, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addSale, updateSale } from '../../store/slices/salesSlice';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SalesForm({ open, onClose, sale, customers, products, stores }) {
  const dispatch = useDispatch();
  const [dateSold, setDateSold] = useState(
    sale?.dateSold ? dayjs(sale.dateSold) : dayjs()
  );
  const [customerId, setCustomerId] = useState(sale?.customerId || '');
  const [productId, setProductId] = useState(sale?.productId || '');
  const [storeId, setStoreId] = useState(sale?.storeId || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      dateSold: dateSold.toISOString(),
      customerId,
      productId,
      storeId
    };
    if (sale) {
      dispatch(updateSale({ id: sale.id, data }));
    } else {
      dispatch(addSale(data));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {sale ? 'Edit Sale' : 'Create Sale'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Sold"
              value={dateSold}
              onChange={(newValue) => setDateSold(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />
          </LocalizationProvider>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Customer</InputLabel>
            <Select
              value={customerId}
              label="Customer"
              onChange={(e) => setCustomerId(e.target.value)}
              required
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Product</InputLabel>
            <Select
              value={productId}
              label="Product"
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name} (${product.price})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Store</InputLabel>
            <Select
              value={storeId}
              label="Store"
              onChange={(e) => setStoreId(e.target.value)}
              required
            >
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {sale ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../store/slices/productSlice';
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

export default function ProductForm({ open, onClose, product }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, price: parseFloat(price) };
    if (product) {
      dispatch(updateProduct({ id: product.id, data }));
    } else {
      dispatch(addProduct(data));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {product ? 'Edit Product' : 'Create Product'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputProps={{ step: "0.01" }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {product ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
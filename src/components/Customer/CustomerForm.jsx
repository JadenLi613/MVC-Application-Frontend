import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addCustomer, updateCustomer } from '../../store/slices/customerSlice';

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

export default function CustomerForm({ open, onClose, customer }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(customer?.name || '');
  const [address, setAddress] = useState(customer?.address || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, address };
    if (customer) {
      dispatch(updateCustomer({ id: customer.id, data }));
    } else {
      dispatch(addCustomer(data));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {customer ? 'Edit Customer' : 'Create Customer'}
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
            label="Address"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {customer ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
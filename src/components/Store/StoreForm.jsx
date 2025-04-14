import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addStore, updateStore } from '../../store/slices/storeSlice';
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

export default function StoreForm({ open, onClose, store }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(store?.name || '');
  const [address, setAddress] = useState(store?.address || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, address };
    if (store) {
      dispatch(updateStore({ id: store.id, data }));
    } else {
      dispatch(addStore(data));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {store ? 'Edit Store' : 'Create Store'}
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
              {store ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores, deleteStore } from '../store/slices/storeSlice';
import StoreList from '../components/Store/StoreList';
import StoreForm from '../components/Store/StoreForm';
import { Button, Box } from '@mui/material';

export default function StoresPage() {
  const dispatch = useDispatch();
  const { data: stores, status } = useSelector((state) => state.stores);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleEdit = (store) => {
    setSelectedStore(store);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      dispatch(deleteStore(id));
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        New Store
      </Button>
      <StoreList
        stores={stores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <StoreForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedStore(null);
        }}
        store={selectedStore}
      />
    </Box>
  );
}
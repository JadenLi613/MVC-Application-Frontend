import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales, deleteSale } from '../store/slices/salesSlice';
import { fetchCustomers } from '../store/slices/customerSlice';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchStores } from '../store/slices/storeSlice';
import SalesList from '../components/Sales/SalesList';
import SalesForm from '../components/Sales/SalesForm';
import { Button, Box } from '@mui/material';

export default function SalesPage() {
  const dispatch = useDispatch();
  const { data: sales } = useSelector((state) => state.sales);
  const { data: customers } = useSelector((state) => state.customers);
  const { data: products } = useSelector((state) => state.products);
  const { data: stores } = useSelector((state) => state.stores);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
    dispatch(fetchStores());
  }, [dispatch]);

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      dispatch(deleteSale(id));
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        New Sale
      </Button>
      <SalesList
        sales={sales}
        customers={customers}
        products={products}
        stores={stores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <SalesForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedSale(null);
        }}
        sale={selectedSale}
        customers={customers}
        products={products}
        stores={stores}
      />
    </Box>
  );
}
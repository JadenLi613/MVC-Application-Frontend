import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer } from '../store/slices/customerSlice';
import CustomerList from '../components/Customer/CustomerList';
import CustomerForm from '../components/Customer/CustomerForm';
import { Button, Box } from '@mui/material';

export default function CustomersPage() {
  const dispatch = useDispatch();
  const { data: customers, status } = useSelector((state) => state.customers);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        New Customer
      </Button>
      <CustomerList
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CustomerForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
      />
    </Box>
  );
}
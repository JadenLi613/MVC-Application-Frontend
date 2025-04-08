import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/slices/productSlice';
import ProductList from '../components/Product/ProductList';
import ProductForm from '../components/Product/ProductForm';
import { Button, Box } from '@mui/material';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        New Product
      </Button>
      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </Box>
  );
}
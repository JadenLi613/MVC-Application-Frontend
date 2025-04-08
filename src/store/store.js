import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';
import storeReducer from './slices/storeSlice';
import salesReducer from './slices/salesSlice';

export default configureStore({
  reducer: {
    customers: customerReducer,
    products: productReducer,
    stores: storeReducer,
    sales: salesReducer
  }
});
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock API URL - replace with your actual API endpoint
const API_URL = 'http://localhost:3001/customers';

export const fetchCustomers = createAsyncThunk('customers/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addCustomer = createAsyncThunk('customers/add', async (customer) => {
  const response = await axios.post(API_URL, customer);
  return response.data;
});

export const updateCustomer = createAsyncThunk('customers/update', async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

export const deleteCustomer = createAsyncThunk('customers/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.data = state.data.filter(c => c.id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
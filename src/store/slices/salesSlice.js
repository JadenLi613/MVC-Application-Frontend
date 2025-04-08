import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/sales';

export const fetchSales = createAsyncThunk('sales/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addSale = createAsyncThunk('sales/add', async (sale) => {
  const response = await axios.post(API_URL, sale);
  return response.data;
});

export const updateSale = createAsyncThunk('sales/update', async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

export const deleteSale = createAsyncThunk('sales/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const salesSlice = createSlice({
  name: 'sales',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        const index = state.data.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.data = state.data.filter(s => s.id !== action.payload);
      });
  },
});

export default salesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/stores';

export const fetchStores = createAsyncThunk('stores/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addStore = createAsyncThunk('stores/add', async (store) => {
  const response = await axios.post(API_URL, store);
  return response.data;
});

export const updateStore = createAsyncThunk('stores/update', async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

export const deleteStore = createAsyncThunk('stores/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const storeSlice = createSlice({
  name: 'stores',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.data.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.data = state.data.filter(s => s.id !== action.payload);
      });
  },
});

export default storeSlice.reducer;
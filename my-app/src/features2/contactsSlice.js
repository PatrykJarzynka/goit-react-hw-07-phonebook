import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, postContacts } from './contactAPI';

const initialState = {
  contacts: {
    items: [],
    filter: '',
    status: 'idle',
  },
};



export const postAsync = createAsyncThunk('contacts/addContacts', async (contact) => {
  const response = await postContacts(contact);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchAsync = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetchContacts();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
      builder
        .addCase(fetchAsync.pending, state => {
          state.status = 'loading';
        })
        .addCase(fetchAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.contacts.items.push(action.payload)
        })
        .addCase(postAsync.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  },
});

export const selectContacts = state => state.counter.contacts.items;

export default contactSlice.reducer;

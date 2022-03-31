import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, postContacts, deleteContact } from './contactAPI';

const initialState = {
  contacts: {
    items: [],
    filter: '',
    status: 'idle',
  },
};

export const deleteAsync = createAsyncThunk('contacts/deleteContacts', async id => {
  await deleteContact(id);
  const response = await fetchContacts();
  return response.data;
});

export const postAsync = createAsyncThunk('contacts/addContacts', async contact => {
  const response = await postContacts(contact);
  return response.data;
});

export const fetchAsync = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetchContacts();
  return response.data;
});

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
      filterContacts: (state,action)=>{ state.contacts.filter = action.payload }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        action.payload.map(contact => state.contacts.items.push(contact));
      })
      .addCase(postAsync.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      });
  },
});

export const { filterContacts } = contactSlice.actions;

export const selectContacts = state => state.data.contacts.items;
export const selectFilter = state => state.data.contacts.filter;

export default contactSlice.reducer;

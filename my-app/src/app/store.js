import { configureStore } from '@reduxjs/toolkit';
import newReducer from '../features/contactsSlice';

export const store = configureStore({
  reducer: {
    data: newReducer,
  },
});

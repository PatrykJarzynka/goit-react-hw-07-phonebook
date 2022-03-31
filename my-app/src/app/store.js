import { configureStore } from '@reduxjs/toolkit';
import newReducer from '../features2/contactsSlice';

export const store = configureStore({
  reducer: {
    data: newReducer,
  },
});

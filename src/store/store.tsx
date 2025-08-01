import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

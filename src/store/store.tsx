import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './selectedItemsSlice';
import charactersSlice from './charactersSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
    characters: charactersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

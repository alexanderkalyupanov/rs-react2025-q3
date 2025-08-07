import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './selectedItemsSlice';
import charactersSlice from './charactersSlice';
import { charactersApi } from '../services/service';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
    characters: charactersSlice,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

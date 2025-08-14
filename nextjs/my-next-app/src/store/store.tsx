import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '../services/service';
import selectedItemsReducer from './selectedItemsSlice';
import charactersReducer from './charactersSlice';

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    selectedItems: selectedItemsReducer,
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


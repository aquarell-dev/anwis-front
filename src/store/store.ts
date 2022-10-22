import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from '../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { orderApi } from '../features/order/orderApi';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware).concat(orderApi.middleware),
  devTools: true
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
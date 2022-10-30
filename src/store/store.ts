import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from '../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { orderApi } from '../features/order/orderApi';
import { orderReducer } from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(orderApi.middleware).concat(apiSlice.middleware),
  devTools: true
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
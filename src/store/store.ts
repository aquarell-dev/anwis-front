import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiSlice } from './api/api.slice';

import { authReducer } from '../features/auth/auth.slice';
import { notificationReducer } from '../features/notifications/notification.slice';
import { individualReducer } from '../features/individuals/individual.slice';
import { documentReducer } from '../features/documents/document.slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    notifications: notificationReducer,
    individual: individualReducer,
    document: documentReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
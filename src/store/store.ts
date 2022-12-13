import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authReducer } from '../features/auth/auth.slice'
import { documentReducer } from '../features/documents/document.slice'
import { individualReducer } from '../features/individuals/individual.slice'
import { notificationReducer } from '../features/notifications/notification.slice'
import { lastActionReducer } from '../features/staff/last.action.slice'
import { apiSlice } from './api/api.slice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    notifications: notificationReducer,
    individual: individualReducer,
    document: documentReducer,
    lastAction: lastActionReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Notification, NotificationInitialState } from './notification.types'

const initialState: NotificationInitialState = {
  notifications: []
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = [...state.notifications, action.payload]
    },
    clearNotifications: state => {
      state.notifications = []
    }
  }
})

export const notificationActions = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer

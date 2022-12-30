export type NotificationInitialState = {
  notifications: Notification[]
}

export type Notification = {
  status: 'error' | 'success' | 'info',
  content: string,
  datetime: string,
}
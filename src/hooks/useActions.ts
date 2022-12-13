import { useDispatch } from 'react-redux'

import { bindActionCreators } from '@reduxjs/toolkit'

import { authActions } from '../features/auth/auth.slice'
import { documentActions } from '../features/documents/document.slice'
import { individualActions } from '../features/individuals/individual.slice'
import { notificationActions } from '../features/notifications/notification.slice'
import { lastActionActions } from '../features/staff/last.action.slice'

const actions = {
  ...authActions,
  ...notificationActions,
  ...individualActions,
  ...documentActions,
  ...lastActionActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(actions, dispatch)
}

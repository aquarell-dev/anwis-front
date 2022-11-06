import { useDispatch } from 'react-redux';
import { authActions } from '../features/auth/auth.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { notificationActions } from '../features/notifications/notification.slice';
import { individualActions } from '../features/individuals/individual.slice';

const actions = {
  ...authActions,
  ...notificationActions,
  ...individualActions
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
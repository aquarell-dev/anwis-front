import { useDispatch } from 'react-redux';
import { authActions } from '../features/auth/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { orderActions } from '../features/order/orderSlice';

const actions = {
  ...authActions,
  ...orderActions
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
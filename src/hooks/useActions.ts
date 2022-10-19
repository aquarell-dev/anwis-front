import { useDispatch } from 'react-redux';
import { authActions } from '../features/auth/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';

const actions = {
  ...authActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthSliceInitialState, ICredentials } from './types';
import { RootState } from '../../store/store';

const LS_US_TOKEN = 'rut';

const getValueFromLocalStorageByKey = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  return JSON.parse(value) as IAuthSliceInitialState;
};

const lsValue = getValueFromLocalStorageByKey(LS_US_TOKEN);

const initialState: IAuthSliceInitialState = {
  user: lsValue?.user,
  token: lsValue?.token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ICredentials>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      localStorage.setItem(LS_US_TOKEN, JSON.stringify(state));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(LS_US_TOKEN);
    }
  }
});

export const authActions = authSlice.actions;

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token; // TODO fix typing here

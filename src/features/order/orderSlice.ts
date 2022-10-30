import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, TStatuses } from './types';

interface IOrderInitialState extends IOrder {
  currentStatus: TStatuses;
}

const initialState: IOrderInitialState[] = [];

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      const doesOrderExist = state.find(order => order.id === action.payload.id);

      const order = { currentStatus: action.payload.status.status, ...action.payload };

      if (!doesOrderExist)
        state.push(order);
    },
    setCurrentStatus: (state, action: PayloadAction<{ currentStatus: TStatuses, id: number }>) => {
      const { currentStatus, id } = action.payload;

      const order = state.find(order => order.id === id);

      if (!order) return;

      state = state.filter(order => order.id !== id);

      order.currentStatus = currentStatus;

      state.push(order);
    },
    clear: state => {
      state = initialState;
    }
  }
});

export const orderActions = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
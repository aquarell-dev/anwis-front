import { apiSlice } from './api.slice';
import { IStatus } from '../../features/order/order.types';

export const statusSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listStatuses: build.query<IStatus[], any>({
      query: (p: any) => ({
        url: 'statuses/'
      })
    }),
  })
});

export const {
  useListStatusesQuery,
} = statusSlice;
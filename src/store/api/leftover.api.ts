import { apiSlice } from './api.slice';
import { ILeftOver } from '../../features/order/order.types';

export const leftoverSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listLeftovers: build.query<ILeftOver[], any>({
      query: p => ({
        url: 'leftovers/'
      }),
      providesTags: ['Leftover']
    }),
    createLeftover: build.mutation<void, { url: string, photo_url: string }>({
      query: leftover => ({
        url: 'leftovers/',
        method: 'POST',
        body: leftover
      }),
      invalidatesTags: ['Leftover']
    }),
    updateLeftovers: build.mutation<void, null>({
      query: () => ({
        url: 'leftovers/update/',
        method: 'PUT',
      }),
      invalidatesTags: ['Leftover']
    }),
    resetCache: build.mutation<void, null>({
      query: () => ({
        url: 'leftovers/reset-cache/',
        method: 'PUT',
      }),
      invalidatesTags: ['Leftover']
    }),
  })
});

export const {
  useListLeftoversQuery,
  useCreateLeftoverMutation,
  useUpdateLeftoversMutation,
  useResetCacheMutation
} = leftoverSlice;
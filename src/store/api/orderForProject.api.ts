import { apiSlice } from './api.slice';
import { ICreateOrderForProject, IOrderForProject } from '../../features/order/order.types';

export const orderForProjectSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listOrderForProjects: build.query<IOrderForProject[], any>({
      query: (p: any) => ({
        url: 'order-for-projects/'
      }),
      providesTags: ['OrderForProject']
    }),
    createOrderForProject: build.mutation<void, ICreateOrderForProject>({
      query: orderForProject => ({
        url: 'order-for-projects/',
        method: 'POST',
        body: orderForProject
      }),
      invalidatesTags: ['OrderForProject']
    }),
  })
});

export const {
  useCreateOrderForProjectMutation,
  useListOrderForProjectsQuery,
} = orderForProjectSlice;
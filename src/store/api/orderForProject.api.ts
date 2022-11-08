import { apiSlice } from './api.slice';
import { IChinaDistributor, ICreateOrderForProject, IOrderForProject } from '../../features/order/order.types';

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
    deleteOrderForProject: build.mutation<void, { id: number }>({
      query: project => ({
        url: `order-for-projects/${project.id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OrderForProject']
    }),
    updateOrderForProject: build.mutation<void, IOrderForProject>({
      query: project => ({
        url: `order-for-projects/${project.id}/`,
        method: 'PUT',
        body: project
      }),
      invalidatesTags: ['OrderForProject']
    }),
  })
});

export const {
  useCreateOrderForProjectMutation,
  useListOrderForProjectsQuery,
  useDeleteOrderForProjectMutation,
  useUpdateOrderForProjectMutation
} = orderForProjectSlice;
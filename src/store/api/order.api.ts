import { apiSlice } from './api.slice';
import { ICreateUpdateOrder, IOrder, PartialOrder } from '../../features/order/order.types';

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listOrders: build.query<IOrder[], any>({
      query: p => ({
        url: 'orders/?archive=0'
      }),
      providesTags: ['Order']
    }),
    getOrderById: build.query<IOrder, string | undefined>({
      query: id => ({
        url: `orders/${id}/`
      }),
      providesTags: ['Order']
    }),
    createOrder: build.mutation<void, ICreateUpdateOrder>({
      query: order => ({
        url: 'orders/',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    updateOrderById: build.mutation<void, ICreateUpdateOrder>({
      query: order => ({
        url: `order/${order.id}/`,
        method: 'PUT',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    updateOrderPartialById: build.mutation<void, PartialOrder>({
      query: order => ({
        url: `order/partial/${order.id}/`,
        method: 'PUT',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    listArchiveOrders: build.query<IOrder[], any>({
      query: p => ({
        url: 'orders/?archive=1'
      }),
      providesTags: ['Order']
    }),
    deleteOrder: build.mutation<void, number>({
      query: id => ({
        url: `orders/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order']
    }),
  })
});

export const {
  useUpdateOrderPartialByIdMutation,
  useUpdateOrderByIdMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useListOrdersQuery,
  useListArchiveOrdersQuery,
  useDeleteOrderMutation
} = orderSlice;
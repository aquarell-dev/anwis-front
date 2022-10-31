import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICategory,
  IChinaDistributor, ICreateCategory, ICreateChinaDistributor,
  ICreateIndividualEntrepreneur, ICreateUpdateOrder, ICreateOrderForProject,
  IIndividualEntrepreneur, IOrder,
  IOrderForProject, IProduct,
  IStatus, ITask, ICreateTask
} from './types';

// http://127.0.0.1:8000/api/
// https://anwis-sklad.herokuapp.com/api/

export const orderApi = createApi({
  reducerPath: 'orders/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anwis-sklad.herokuapp.com/api/' }),
  tagTypes: ['IIndividualEntrepreneur', 'IChinaDistributor', 'IOrderForProject', 'IOrder', 'ICategory', 'ITask'],
  endpoints: build => ({
    listIndividualEntrepreneurs: build.query<IIndividualEntrepreneur[], any>({
      query: (p: any) => ({
        url: 'individual-entrepreneurs/'
      }),
      providesTags: ['IIndividualEntrepreneur']
    }),
    createIndividualEntrepreneur: build.mutation<void, ICreateIndividualEntrepreneur>({
      query: individualEntrepreneur => ({
        url: 'individual-entrepreneurs/',
        method: 'POST',
        body: individualEntrepreneur
      }),
      invalidatesTags: ['IIndividualEntrepreneur']
    }),
    // --------------------------------------------------------------------------------------------------------------
    listChinaDistributors: build.query<IChinaDistributor[], any>({
      query: (p: any) => ({
        url: 'china-distributors/'
      }),
      providesTags: ['IChinaDistributor']
    }),
    createChinaDistributor: build.mutation<void, ICreateChinaDistributor>({
      query: chinaDistributor => ({
        url: 'china-distributors/',
        method: 'POST',
        body: chinaDistributor
      }),
      invalidatesTags: ['IChinaDistributor']
    }),
    // --------------------------------------------------------------------------------------------------------------
    listOrderForProjects: build.query<IOrderForProject[], any>({
      query: (p: any) => ({
        url: 'order-for-projects/'
      }),
      providesTags: ['IOrderForProject']
    }),
    createOrderForProject: build.mutation<void, ICreateOrderForProject>({
      query: orderForProject => ({
        url: 'order-for-projects/',
        method: 'POST',
        body: orderForProject
      }),
      invalidatesTags: ['IOrderForProject']
    }),
    // --------------------------------------------------------------------------------------------------------------
    listStatuses: build.query<IStatus[], any>({
      query: (p: any) => ({
        url: 'statuses/'
      })
    }),
    // --------------------------------------------------------------------------------------------------------------
    listOrders: build.query<IOrder[], any>({
      query: p => ({
        url: 'orders/'
      }),
      providesTags: ['IOrder']
    }),
    getOrderById: build.query<IOrder, string | undefined>({
      query: id => ({
        url: `orders/${id}/`
      }),
      providesTags: ['IOrder']
    }),
    createOrder: build.mutation<void, ICreateUpdateOrder>({
      query: order => ({
        url: 'orders/',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['IOrder']
    }),
    updateOrderById: build.mutation<void, ICreateUpdateOrder>({
      query: order => ({
        url: `order/${order.id}/`,
        method: 'PUT',
        body: order
      }),
      invalidatesTags: ['IOrder']
    }),
    updateOrderPartialById: build.mutation<void, Partial<ICreateUpdateOrder>>({
      query: order => ({
        url: `order/partial/${order.id}/`,
        method: 'PUT',
        body: order
      }),
      invalidatesTags: ['IOrder']
    }),
    // --------------------------------------------------------------------------------------------------------------
    listProducts: build.query<IProduct[], any>({
      query: p => ({
        url: 'products/'
      })
    }),
    // --------------------------------------------------------------------------------------------------------------
    listCategories: build.query<ICategory[], any>({
      query: p => ({
        url: 'categories/'
      }),
      providesTags: ['ICategory']
    }),
    createCategory: build.mutation<void, ICreateCategory>({
      query: category => ({
        url: 'categories/',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['ICategory']
    }),
    // --------------------------------------------------------------------------------------------------------------
    listTasks: build.query<ITask[], any>({
      query: p => ({
        url: 'tasks/'
      }),
      providesTags: ['ITask']
    }),
    createTask: build.mutation<void, ICreateTask>({
      query: task => ({
        url: 'tasks/',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['ITask']
    }),
  })
});

export const {
  useListIndividualEntrepreneursQuery,
  useListChinaDistributorsQuery,
  useListOrderForProjectsQuery,
  useListStatusesQuery,
  useListOrdersQuery,
  useListProductsQuery,
  useListCategoriesQuery,
  useGetOrderByIdQuery,
  useListTasksQuery,

  useCreateIndividualEntrepreneurMutation,
  useCreateChinaDistributorMutation,
  useCreateOrderForProjectMutation,
  useCreateOrderMutation,
  useCreateTaskMutation,
  useCreateCategoryMutation,
  useUpdateOrderPartialByIdMutation,
  useUpdateOrderByIdMutation,
} = orderApi;

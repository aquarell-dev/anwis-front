import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IChinaDistributor, ICreateChinaDistributor,
  ICreateIndividualEntrepreneur, ICreateOrder, ICreateOrderForProject,
  IIndividualEntrepreneur, IOrder,
  IOrderForProject, IProduct,
  IStatus
} from './types';

// http://127.0.0.1:8000/api/
// https://anwis-sklad.herokuapp.com/api/

export const orderApi = createApi({
  reducerPath: 'orders/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anwis-sklad.herokuapp.com/api/' }),
  tagTypes: ['IIndividualEntrepreneur', 'IChinaDistributor', 'IOrderForProject', 'IOrder'],
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
    createOrder: build.mutation<void, ICreateOrder>({
      query: order => ({
        url: 'orders/',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['IOrder']
    }),
    // --------------------------------------------------------------------------------------------------------------
    listProducts: build.query<IProduct[], any>({
      query: p => ({
        url: 'products/'
      })
    })
  })
});

export const {
  useListIndividualEntrepreneursQuery,
  useListChinaDistributorsQuery,
  useListOrderForProjectsQuery,
  useListStatusesQuery,
  useListOrdersQuery,
  useListProductsQuery,

  useCreateIndividualEntrepreneurMutation,
  useCreateChinaDistributorMutation,
  useCreateOrderForProjectMutation,
  useCreateOrderMutation
} = orderApi;

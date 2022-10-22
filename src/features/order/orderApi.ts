import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IChinaDistributor, ICreateChinaDistributor,
  ICreateIndividualEntrepreneur, ICreateOrderForProject,
  IIndividualEntrepreneur,
  IOrderForProject,
  IStatus
} from './types';

export const orderApi = createApi({
  reducerPath: 'orders/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anwis-sklad.herokuapp.com/api/' }),
  tagTypes: ['IIndividualEntrepreneur', 'IChinaDistributor', 'IOrderForProject'],
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
  })
});

export const {
  useListIndividualEntrepreneursQuery,
  useListChinaDistributorsQuery,
  useListOrderForProjectsQuery,
  useListStatusesQuery,

  useCreateIndividualEntrepreneurMutation,
  useCreateChinaDistributorMutation,
  useCreateOrderForProjectMutation
} = orderApi;

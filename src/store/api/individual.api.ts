import { apiSlice } from './api.slice';
import { ICreateIndividualEntrepreneur, IIndividualEntrepreneur } from '../../features/order/order.types';

export const individualSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listIndividualEntrepreneurs: build.query<IIndividualEntrepreneur[], any>({
      query: (p: any) => ({
        url: 'individual-entrepreneurs/'
      }),
      providesTags: ['IndividualEntrepreneur']
    }),
    createIndividualEntrepreneur: build.mutation<void, ICreateIndividualEntrepreneur>({
      query: individualEntrepreneur => ({
        url: 'individual-entrepreneurs/',
        method: 'POST',
        body: individualEntrepreneur
      }),
      invalidatesTags: ['IndividualEntrepreneur']
    }),
})});

export const {
  useListIndividualEntrepreneursQuery,
  useCreateIndividualEntrepreneurMutation,
} = individualSlice;
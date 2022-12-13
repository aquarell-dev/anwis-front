import { ICreateIndividual, IIndividual } from '../../features/order/order.types'
import { apiSlice } from './api.slice'

export const individualSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listIndividualEntrepreneurs: build.query<IIndividual[], any>({
      query: (p: any) => ({
        url: 'individual-entrepreneurs/'
      }),
      providesTags: ['IndividualEntrepreneur']
    }),
    createIndividualEntrepreneur: build.mutation<void, ICreateIndividual>({
      query: individualEntrepreneur => ({
        url: 'individual-entrepreneurs/',
        method: 'POST',
        body: individualEntrepreneur
      }),
      invalidatesTags: ['IndividualEntrepreneur']
    })
  })
})

export const { useListIndividualEntrepreneursQuery, useCreateIndividualEntrepreneurMutation } =
  individualSlice

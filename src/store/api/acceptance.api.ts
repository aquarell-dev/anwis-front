import {
  Acceptance,
  CreateAcceptance,
  PartialUpdateProductSpecification,
  UpdateDetailedProductsAcceptance
} from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const acceptanceSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listAcceptances: build.query<Acceptance[], any>({
      query: p => ({
        url: 'acceptances/'
      }),
      providesTags: ['Acceptance']
    }),
    getAcceptanceById: build.query<Acceptance, number>({
      query: id => ({
        url: `acceptances/${id}/`
      }),
      providesTags: ['Acceptance']
    }),
    createAcceptance: build.mutation<Acceptance, CreateAcceptance>({
      query: acceptance => ({
        url: 'acceptances/',
        method: 'POST',
        body: acceptance
      }),
      invalidatesTags: ['Acceptance']
    }),
    createAcceptanceFromOrder: build.mutation<{ acceptance_id: number }, { order_id: number }>({
      query: body => ({
        url: 'acceptances/from-order/',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    updateAcceptanceFromOrder: build.mutation<
      { acceptance_id: number },
      { order_id: number; acceptance_id: number }
    >({
      query: body => ({
        url: 'acceptances/update/from-order/',
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    updateDetailedProductsAcceptance: build.mutation<Acceptance, UpdateDetailedProductsAcceptance>({
      query: body => ({
        url: `acceptance/detailed-products-update/${body.id}/`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    updatePartialSpecifications: build.mutation<
      PartialUpdateProductSpecification,
      PartialUpdateProductSpecification
    >({
      query: body => ({
        url: `acceptance/specification/${body.id}/`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    })
  })
})

export const {
  useListAcceptancesQuery,
  useGetAcceptanceByIdQuery,
  useCreateAcceptanceMutation,
  useCreateAcceptanceFromOrderMutation,
  useUpdateAcceptanceFromOrderMutation,
  useUpdateDetailedProductsAcceptanceMutation,
  useUpdatePartialSpecificationsMutation
} = acceptanceSlice

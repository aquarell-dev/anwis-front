import {
  AcceptanceProductSpecification,
  PartialUpdateProductSpecification
} from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const acceptanceSpecificationSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    updatePartialSpecifications: build.mutation<
      PartialUpdateProductSpecification,
      PartialUpdateProductSpecification
    >({
      query: body => ({
        url: `acceptance/specification/${body.id}/`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Acceptance']
    }),
    updateMultipleSpecifications: build.mutation<
      { id: number; status: 'updated' },
      { specifications: PartialUpdateProductSpecification[] }
    >({
      query: body => ({
        url: `acceptance/specification/multiple/`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    createMultipleSpecifications: build.mutation<
      AcceptanceProductSpecification[],
      { id: number; products: number[] }
    >({
      query: body => ({
        url: `acceptance/specification/create-multiple/`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    deleteMultipleSpecifications: build.mutation<
      { status: 'ok' | 'error' },
      { specifications: number[] }
    >({
      query: body => ({
        url: `acceptance/specification/delete-multiple/`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    getSpecificationByBox: build.mutation<AcceptanceProductSpecification, { box_number: string }>({
      query: body => ({
        url: 'acceptance/specification/by-box/',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    getSpecificationByBarcode: build.mutation<AcceptanceProductSpecification, { barcode: string }>({
      query: body => ({
        url: 'acceptance/specification/by-barcode/',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    addReason: build.mutation<AcceptanceProductSpecification, { id: number }>({
      query: body => ({
        url: `acceptance/specification/${body.id}/add-reason/`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Acceptance']
    })
  })
})

export const {
  useUpdatePartialSpecificationsMutation,
  useUpdateMultipleSpecificationsMutation,
  useDeleteMultipleSpecificationsMutation,
  useGetSpecificationByBoxMutation,
  useGetSpecificationByBarcodeMutation,
  useAddReasonMutation,
  useCreateMultipleSpecificationsMutation
} = acceptanceSpecificationSlice

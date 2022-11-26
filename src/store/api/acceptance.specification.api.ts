import { PartialUpdateProductSpecification } from '../../types/acceptance.types'
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
        body: body
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
    })
  })
})

export const {
  useUpdatePartialSpecificationsMutation,
  useUpdateMultipleSpecificationsMutation,
  useDeleteMultipleSpecificationsMutation
} = acceptanceSpecificationSlice

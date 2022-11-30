import { AcceptanceProductSpecification } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const reasonSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    deleteReason: build.mutation<AcceptanceProductSpecification, { id: number }>({
      query: body => ({
        url: `acceptance/reason/${body.id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Acceptance']
    })
  })
})

export const { useDeleteReasonMutation } = reasonSlice

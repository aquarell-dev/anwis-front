import { AcceptanceProduct, CreateLabel } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const labelApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    generateLabel: build.mutation<AcceptanceProduct[], { products: CreateLabel[] }>({
      query: label => ({
        url: 'acceptance/generate-labels/',
        method: 'POST',
        body: label
      }),
      invalidatesTags: ['Acceptance']
    })
  })
})

export const { useGenerateLabelMutation } = labelApi

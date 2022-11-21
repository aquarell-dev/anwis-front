import { CreateLabel } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const labelApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    generateLabel: build.mutation<{ status: string; url: string }, CreateLabel>({
      query: label => ({
        url: 'acceptance/generate-labels/',
        method: 'PUT',
        body: label
      })
    })
  })
})

export const { useGenerateLabelMutation } = labelApi

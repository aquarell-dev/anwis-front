import { Acceptance, CreateAcceptance } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const acceptanceSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    listAcceptances: build.query<Acceptance[], any>({
      query: (p) => ({
        url: 'acceptances/'
      }),
      providesTags: ['Acceptance']
    }),
    getAcceptanceById: build.query<Acceptance, number>({
      query: (id) => ({
        url: `acceptances/${id}/`
      }),
      providesTags: ['Acceptance']
    }),
    createAcceptance: build.mutation<Acceptance, CreateAcceptance>({
      query: (acceptance) => ({
        url: 'acceptances/',
        method: 'POST',
        body: acceptance
      })
    }),
    createAcceptanceFromOrder: build.mutation<Acceptance, { order_id: number }>({
      query: (body) => ({
        url: 'acceptances/from-order/',
        method: 'POST',
        body: body
      })
    })
  })
})

export const {
  useListAcceptancesQuery,
  useGetAcceptanceByIdQuery,
  useCreateAcceptanceMutation,
  useCreateAcceptanceFromOrderMutation
} = acceptanceSlice

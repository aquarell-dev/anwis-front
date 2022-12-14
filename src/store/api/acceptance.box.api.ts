import { SearchSpecificationByBox } from '../../components/screens/Acceptance/types'
import { AcceptanceProductSpecification, PartialUpdateBox } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const boxSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    addBox: build.mutation<AcceptanceProductSpecification, { id: number }>({
      query: body => ({
        url: `acceptance/specification/${body.id}/add-box/`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Acceptance']
    }),
    deleteBox: build.mutation<AcceptanceProductSpecification, { id: number }>({
      query: body => ({
        url: `acceptance/box/${body.id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Acceptance']
    }),
    partialUpdateBox: build.mutation<AcceptanceProductSpecification, PartialUpdateBox>({
      query: body => ({
        url: `acceptance/box/${body.id}/`,
        method: 'PATCH',
        body
      })
    }),
    getBoxByBoxNumber: build.query<SearchSpecificationByBox, string>({
      query: box => ({
        url: `acceptance/box/detailed/${box}/`
      })
    })
  })
})

export const {
  useAddBoxMutation,
  useDeleteBoxMutation,
  useLazyGetBoxByBoxNumberQuery,
  usePartialUpdateBoxMutation
} = boxSlice

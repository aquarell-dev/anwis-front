import { SearchSpecificationByBox } from '../../components/screens/Acceptance/types'
import { AcceptanceProductSpecification } from '../../types/acceptance.types'
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
    getBoxByBoxNumber: build.query<SearchSpecificationByBox, string>({
      query: box => ({
        url: `acceptance/boxes/${box}/`
      })
    })
  })
})

export const { useAddBoxMutation, useDeleteBoxMutation, useLazyGetBoxByBoxNumberQuery } = boxSlice

import {
  AcceptanceProduct,
  CreateAcceptanceProduct,
  UpdateAcceptanceProduct
} from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

const acceptanceProductsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    listRussianProducts: build.query<AcceptanceProduct[], undefined>({
      query: () => ({
        url: 'acceptance/products/'
      }),
      providesTags: ['RussianProduct']
    }),
    createRussianProduct: build.mutation<AcceptanceProduct, CreateAcceptanceProduct>({
      query: product => ({
        url: 'acceptance/products/',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['RussianProduct']
    }),
    createRussianProductWithoutRefetching: build.mutation<
      AcceptanceProduct,
      CreateAcceptanceProduct
    >({
      query: product => ({
        url: 'acceptance/products/',
        method: 'POST',
        body: product
      })
    }),
    updateRussianProduct: build.mutation<AcceptanceProduct, UpdateAcceptanceProduct>({
      query: product => ({
        url: `acceptance/products/${product.id}/`,
        method: 'PUT',
        body: product
      }),
      invalidatesTags: ['RussianProduct']
    }),
    deleteRussianProduct: build.mutation<AcceptanceProduct, { id: number }>({
      query: product => ({
        url: `acceptance/products/${product.id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['RussianProduct']
    }),
    updateColors: build.mutation<{ status: 'ok' }, undefined>({
      query: () => ({
        url: `acceptance/update-colors/`,
        method: 'PUT'
      }),
      invalidatesTags: ['RussianProduct']
    }),
    updateLefovers: build.mutation<{ status: 'ok' }, undefined>({
      query: () => ({
        url: 'acceptance/update-leftovers/',
        method: 'PUT'
      })
    })
  })
})

export const {
  useListRussianProductsQuery,
  useCreateRussianProductMutation,
  useDeleteRussianProductMutation,
  useUpdateRussianProductMutation,
  useCreateRussianProductWithoutRefetchingMutation,
  useUpdateColorsMutation,
  useUpdateLefoversMutation
} = acceptanceProductsApi

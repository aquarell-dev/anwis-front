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
    createMultipleRussianProducts: build.mutation<
      { status: 'ok' | 'error' },
      { products: CreateAcceptanceProduct[] }
    >({
      query: body => ({
        url: 'acceptance/create-products/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['RussianProduct']
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
    deleteMultipleProducts: build.mutation<
      { status: 'ok' | 'error'; message?: string },
      { products: number[] }
    >({
      query: products => ({
        url: `acceptance/delete-products/`,
        method: 'PUT',
        body: products
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
      }),
      invalidatesTags: ['RussianProduct']
    }),
    updateMultipleCategories: build.mutation<
      { status: 'ok' | 'error' },
      { products: number[]; category: number }
    >({
      query: body => ({
        url: 'acceptance/update-categories/',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['RussianProduct']
    }),
    fetchPhotos: build.mutation<{ status: 'ok' | 'error' }, { articles: string[] }>({
      query: body => ({
        url: 'acceptance/update-photos/',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['RussianProduct']
    })
  })
})

export const {
  useListRussianProductsQuery,
  useCreateRussianProductMutation,
  useDeleteRussianProductMutation,
  useUpdateRussianProductMutation,
  useCreateMultipleRussianProductsMutation,
  useUpdateColorsMutation,
  useUpdateLefoversMutation,
  useUpdateMultipleCategoriesMutation,
  useDeleteMultipleProductsMutation,
  useFetchPhotosMutation
} = acceptanceProductsApi

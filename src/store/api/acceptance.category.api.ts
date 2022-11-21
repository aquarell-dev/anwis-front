import { AcceptanceCategory } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

const acceptanceCategoriesApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    listRussianCategories: build.query<AcceptanceCategory[], undefined>({
      query: () => ({
        url: 'acceptance/categories/'
      }),
      providesTags: ['AcceptanceCategory']
    }),
    updateRussianCategory: build.mutation<AcceptanceCategory, AcceptanceCategory>({
      query: category => ({
        url: `acceptance/categories/${category.id}/`,
        method: 'PUT',
        body: category
      }),
      invalidatesTags: ['AcceptanceCategory']
    }),
    createRussianCategory: build.mutation<AcceptanceCategory, Pick<AcceptanceCategory, 'category'>>(
      {
        query: category => ({
          url: `acceptance/categories/`,
          method: 'POST',
          body: category
        }),
        invalidatesTags: ['AcceptanceCategory']
      }
    ),
    deleteRussianCategory: build.mutation<AcceptanceCategory, AcceptanceCategory>({
      query: category => ({
        url: `acceptance/categories/${category.id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['AcceptanceCategory']
    })
  })
})

export const {
  useListRussianCategoriesQuery,
  useCreateRussianCategoryMutation,
  useDeleteRussianCategoryMutation,
  useUpdateRussianCategoryMutation
} = acceptanceCategoriesApi

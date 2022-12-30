import { apiSlice } from './api.slice';
import { ICategory, ICreateCategory, ICreateTask, ITask } from '../../features/order/order.types';

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listCategories: build.query<ICategory[], any>({
      query: p => ({
        url: 'categories/'
      }),
      providesTags: ['Category']
    }),
    createCategory: build.mutation<void, ICreateCategory>({
      query: category => ({
        url: 'categories/',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Category']
    }),
    deleteCategory: build.mutation<void, number>({
      query: id => ({
        url: `categories/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category']
    }),
    updateCategory: build.mutation<void, ICategory>({
      query: category => ({
        url: `categories/${category.id}/`,
        method: 'PUT',
        body: category
      }),
      invalidatesTags: ['Category', 'Product']
    }),
  })
});

export const {
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categorySlice;
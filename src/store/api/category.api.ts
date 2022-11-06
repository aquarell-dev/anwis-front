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
  })
});

export const {
  useListCategoriesQuery,
  useCreateCategoryMutation,
} = categorySlice;
import { apiSlice } from './api.slice';
import { IProduct } from '../../features/order/order.types';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listProducts: build.query<IProduct[], any>({
      query: p => ({
        url: 'products/'
      }),
      providesTags: ['Product']
    }),
    createProduct: build.mutation<void, FormData>({
      query: product => ({
        url: 'products/update/',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
  })
});

export const {
  useCreateProductMutation,
  useListProductsQuery,
} = productSlice;
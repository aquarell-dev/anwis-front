import { apiSlice } from './api.slice';
import { ICreateProduct, IProduct } from '../../features/order/order.types';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listProducts: build.query<IProduct[], any>({
      query: p => ({
        url: 'products/'
      }),
      providesTags: ['Product']
    }),
    createProduct: build.mutation<void, ICreateProduct>({
      query: product => ({
        url: 'products/',
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
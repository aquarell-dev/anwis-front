import { apiSlice } from './api.slice';
import { ICreateProduct, IProduct, PartialProduct } from '../../features/order/order.types';

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
    updatePartialProduct: build.mutation<void, PartialProduct>({
      query: product => ({
        url: `products/partial/${product.id}/`,
        method: 'PUT',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: build.mutation<void, number>({
      query: id => ({
        url: `products/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product']
    }),
    deleteProducts: build.mutation<void, number[]>({
      query: products => ({
        url: `products/delete-multiple/?products=${products.join(',')}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product']
    }),
  })
});

export const {
  useCreateProductMutation,
  useListProductsQuery,
  useUpdatePartialProductMutation,
  useDeleteProductMutation,
  useDeleteProductsMutation,
} = productSlice;
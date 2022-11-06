import { apiSlice } from './api.slice';
import { IChinaDistributor, ICreateChinaDistributor, IProduct } from '../../features/order/order.types';

export const distributorSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listChinaDistributors: build.query<IChinaDistributor[], any>({
      query: p => ({
        url: 'china-distributors/'
      }),
      providesTags: ['ChinaDistributor']
    }),
    createChinaDistributor: build.mutation<void, ICreateChinaDistributor>({
      query: distributor => ({
        url: 'china-distributors/',
        method: 'POST',
        body: distributor
      }),
      invalidatesTags: ['ChinaDistributor']
    }),
  })
});

export const {
  useListChinaDistributorsQuery,
  useCreateChinaDistributorMutation
} = distributorSlice;
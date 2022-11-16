import { AcceptanceProduct } from '../../types/acceptance.types';
import { apiSlice } from './api.slice';

const acceptanceProductsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    listRussianProducts: build.query<AcceptanceProduct[], undefined>({
      query: () => ({
        url: 'acceptance/products/'
      })
    })
  })
});

export const { useListRussianProductsQuery } = acceptanceProductsApi;

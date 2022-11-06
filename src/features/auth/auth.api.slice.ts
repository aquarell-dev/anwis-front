import { apiSlice } from '../../store/api/api.slice';
import { IUserCredentials } from '../../components/screens/Index/index.types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<void, IUserCredentials>({
      query: credentials => ({
        url: '/api/token/',
        method: 'POST',
        body: { ...credentials }
      })
    }),
  })
});

export const { useLoginMutation } = authApiSlice;
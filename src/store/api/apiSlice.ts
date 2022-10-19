import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // @ts-ignore
    const token = getState().auth.token;

    headers.set('Content-Type', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers;
  }
});

const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: any) => {
  let res = await baseQuery(args, api, extraOptions);

  if (res?.error?.status === 403) {
    console.log('send refresh token');
    const refreshRes = await baseQuery('/api/token/refresh', api, extraOptions);
    console.log(refreshRes);
    if (refreshRes?.data) {
      // @ts-ignore
      const user = api.getState().auth.user;

      api.dispatch(setCredentials({ user: (user as string) , accessToken: (refreshRes.data as string) }))

      res = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut())
    }
  }

  return res;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({})
});
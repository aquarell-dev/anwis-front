import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/auth.slice';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

// https://anwis-sklad.herokuapp.com/api/
// http://localhost:8000/api/

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://anwis-sklad.herokuapp.com/api/1',
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
    const refreshRes = await baseQuery('token/refresh', api, extraOptions);
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
  tagTypes: [
    'IndividualEntrepreneur', 'ChinaDistributor', 'OrderForProject', 'Order',
    'Category', 'Task', 'Leftover', 'Product'
  ],
  endpoints: build => ({})
});
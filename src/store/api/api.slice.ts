import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { logOut, setCredentials } from '../../features/auth/auth.slice'

// https://anwis-sklad.herokuapp.com/api/
// http://localhost:8000/api/

export const API_LINK = 'http://localhost:8000/api/'

const baseQuery = fetchBaseQuery({
  baseUrl: API_LINK,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // @ts-ignore
    const token = getState().auth.token

    headers.set('Content-Type', 'application/json')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: any) => {
  let res = await baseQuery(args, api, extraOptions)

  if (res?.error?.status === 403) {
    const refreshRes = await baseQuery('token/refresh', api, extraOptions)
    if (refreshRes?.data) {
      // @ts-ignore
      const user = api.getState().auth.user

      api.dispatch(setCredentials({ user: user as string, accessToken: refreshRes.data as string }))

      res = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return res
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'IndividualEntrepreneur',
    'ChinaDistributor',
    'OrderForProject',
    'Order',
    'Category',
    'Task',
    'Leftover',
    'Product',
    'Acceptance',
    'Members',
    'Packages',
    'AcceptanceCategory',
    'RussianProduct'
  ],
  endpoints: build => ({})
})

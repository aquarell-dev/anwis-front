import { AcceptanceStatus } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const acceptanceStatusApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    listAcceptanceStatuses: build.query<AcceptanceStatus[], null>({
      query: () => ({
        url: 'acceptance/statuses/'
      })
    })
  })
})

export const { useListAcceptanceStatusesQuery } = acceptanceStatusApi

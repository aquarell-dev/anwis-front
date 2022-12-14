import {
  Box,
  MinimalisticWorkSession,
  StaffMember,
  TimeSession,
  WorkSession,
  WorkSessionDetailed
} from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const sessionSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    updateWorkSession: build.mutation<WorkSession, WorkSession>({
      query: session => ({
        url: `acceptance/work-session/${session.id}/`,
        method: 'PUT',
        body: session
      }),
      invalidatesTags: ['Members']
    }),
    updateTimeSession: build.mutation<TimeSession, TimeSession>({
      query: session => ({
        url: `acceptance/time-session/${session.id}/`,
        method: 'PUT',
        body: session
      }),
      invalidatesTags: ['Members']
    }),
    listWorkSessionsByAcceptance: build.query<MinimalisticWorkSession[], number>({
      query: acceptance => ({
        url: `acceptance/work-session/?acceptance=${acceptance}`
      }),
      providesTags: ['Members']
    }),
    listWorkSessionsByBox: build.query<MinimalisticWorkSession[], string>({
      query: box => ({
        url: `acceptance/work-session/?box=${box}`
      }),
      providesTags: ['Members']
    }),
    listWorkSessionsByToday: build.query<MinimalisticWorkSession[], null>({
      query: () => ({
        url: `acceptance/work-session/?today=1`
      }),
      providesTags: ['Members']
    })
  })
})

export const {
  useUpdateWorkSessionMutation,
  useUpdateTimeSessionMutation,
  useListWorkSessionsByAcceptanceQuery,
  useListWorkSessionsByBoxQuery,
  useListWorkSessionsByTodayQuery
} = sessionSlice

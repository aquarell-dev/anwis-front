import {
  CreateStaffMember,
  PartialDetailedBoxUpdateStaffMember,
  PartialUpdateStaffMember,
  StaffMember,
  UpdateStaffMember
} from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

const staffApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    listMembers: build.query<StaffMember[], undefined>({
      query: () => ({
        url: 'acceptance/members/'
      }),
      providesTags: ['Members']
    }),
    getMember: build.query<StaffMember, string>({
      query: uniqueNumber => ({
        url: `acceptance/members/${uniqueNumber}/`
      }),
      providesTags: ['Members']
    }),
    createMember: build.mutation<StaffMember, CreateStaffMember>({
      query: member => ({
        url: 'acceptance/members/',
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Members']
    }),
    updateMember: build.mutation<StaffMember, UpdateStaffMember>({
      query: member => ({
        url: `acceptance/members/${member.unique_number}/`,
        method: 'PUT',
        body: member
      }),
      invalidatesTags: ['Members']
    }),
    partialUpdateMember: build.mutation<StaffMember, PartialUpdateStaffMember>({
      query: member => ({
        url: `acceptance/members/${member.unique_number}/`,
        method: 'PATCH',
        body: member
      }),
      invalidatesTags: ['Members']
    }),
    partialUpdateDetailedBoxMember: build.mutation<
      StaffMember,
      PartialDetailedBoxUpdateStaffMember
    >({
      query: member => ({
        url: `acceptance/members/${member.unique_number}/`,
        method: 'PATCH',
        body: member
      }),
      invalidatesTags: ['Members']
    })
  })
})

export const {
  useListMembersQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useLazyGetMemberQuery,
  usePartialUpdateMemberMutation,
  usePartialUpdateDetailedBoxMemberMutation
} = staffApi

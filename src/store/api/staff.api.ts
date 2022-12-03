import { CreateStaffMember, StaffMember, UpdateStaffMember } from '../../types/acceptance.types'
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
      })
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
        url: `acceptance/members/${member.id}/`,
        method: 'PUT',
        body: member
      }),
      invalidatesTags: ['Members']
    }),
    partialUpdateMember: build.mutation<StaffMember, StaffMember>({
      query: member => ({
        url: `acceptance/members/${member.id}/`,
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
  usePartialUpdateMemberMutation
} = staffApi

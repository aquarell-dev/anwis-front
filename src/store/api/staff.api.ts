import { CreateStaffMember, StaffMember } from '../../types/acceptance.types';
import { apiSlice } from './api.slice';

const staffApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    listMembers: build.query<StaffMember[], undefined>({
      query: () => ({
        url: 'members/'
      }),
      providesTags: ['Members']
    }),
    createMember: build.mutation<StaffMember, CreateStaffMember>({
      query: (member) => ({
        url: 'members/',
        method: 'POST',
        body: member
      }),
      invalidatesTags: ['Members']
    }),
    updateMember: build.mutation<StaffMember, StaffMember>({
      query: (member) => ({
        url: `members/${member.id}/`,
        method: 'PUT',
        body: member
      }),
      invalidatesTags: ['Members']
    })
  })
});

export const { useListMembersQuery, useCreateMemberMutation, useUpdateMemberMutation } = staffApi;

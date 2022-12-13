import { ICreateProject, IProject } from '../../features/order/order.types'
import { apiSlice } from './api.slice'

export const projectSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listOrderForProjects: build.query<IProject[], any>({
      query: (p: any) => ({
        url: 'projects/'
      }),
      providesTags: ['OrderForProject']
    }),
    createOrderForProject: build.mutation<void, ICreateProject>({
      query: orderForProject => ({
        url: 'projects/',
        method: 'POST',
        body: orderForProject
      }),
      invalidatesTags: ['OrderForProject']
    }),
    deleteOrderForProject: build.mutation<void, { id: number }>({
      query: project => ({
        url: `projects/${project.id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['OrderForProject']
    }),
    updateOrderForProject: build.mutation<void, IProject>({
      query: project => ({
        url: `projects/${project.id}/`,
        method: 'PUT',
        body: project
      }),
      invalidatesTags: ['OrderForProject']
    })
  })
})

export const {
  useCreateOrderForProjectMutation,
  useListOrderForProjectsQuery,
  useDeleteOrderForProjectMutation,
  useUpdateOrderForProjectMutation
} = projectSlice

import { apiSlice } from './api.slice';
import { ICreateTask, ITask } from '../../features/order/order.types';

export const taskSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listTasks: build.query<ITask[], any>({
      query: p => ({
        url: 'tasks/'
      }),
      providesTags: ['Task']
    }),
    createTask: build.mutation<void, ICreateTask>({
      query: task => ({
        url: 'tasks/',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task']
    }),
  })
});

export const {
  useListTasksQuery,
  useCreateTaskMutation,
} = taskSlice;
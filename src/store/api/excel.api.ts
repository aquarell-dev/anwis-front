import { apiSlice } from './api.slice';

export const excelSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    formExcel: build.mutation<void, { id: number }>({
      query: body => ({
        url: 'form-excel/',
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Order']
    }),
  })
});

export const {
  useFormExcelMutation,
} = excelSlice;
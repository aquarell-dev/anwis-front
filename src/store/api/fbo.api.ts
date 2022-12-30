import { CreateFboShipping, FBOShipping, PatchFboShipping } from '../../types/fbo.types'
import { apiSlice } from './api.slice'

export const fboSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    createFboShipping: build.mutation<FBOShipping, CreateFboShipping>({
      query: fbo => ({
        url: 'shippings/',
        method: 'POST',
        body: fbo
      })
    }),
    listFboShippings: build.query<FBOShipping[], any>({
      query: () => ({
        url: 'shippings/'
      })
    }),
    retrieveFboShipping: build.query<FBOShipping, number>({
      query: id => ({
        url: `shippings/${id}/`
      })
    }),
    patchFbo: build.mutation<FBOShipping, PatchFboShipping>({
      query: fbo => ({
        url: `shippings/${fbo.id}/`,
        method: 'PATCH',
        body: fbo
      })
    })
  })
})

export const {
  useCreateFboShippingMutation,
  useListFboShippingsQuery,
  useRetrieveFboShippingQuery,
  usePatchFboMutation
} = fboSlice

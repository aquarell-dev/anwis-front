import { Payment } from '../../types/acceptance.types'
import { apiSlice } from './api.slice'

export const paymentSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    retrievePayment: build.query<Payment, number>({
      query: payment => ({
        url: `acceptance/payment/${payment}/`
      }),
      providesTags: ['Payment']
    }),
    updatePayment: build.mutation<Payment, Payment>({
      query: payment => ({
        url: `acceptance/payment/${payment.id}/`,
        body: payment,
        method: 'PUT'
      }),
      invalidatesTags: ['Payment']
    })
  })
})

export const { useUpdatePaymentMutation, useRetrievePaymentQuery } = paymentSlice

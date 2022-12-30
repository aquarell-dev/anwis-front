import { useEffect, useState } from 'react'

import useMutate from '../../../../hooks/useMutate'

import {
  useRetrievePaymentQuery,
  useUpdatePaymentMutation
} from '../../../../store/api/payment.api'
import { Payment } from '../../../../types/acceptance.types'

const usePayment = () => {
  const { data, isLoading, isFetching } = useRetrievePaymentQuery(1)

  const [paidBreak, setPaidBreak] = useState({
    hours: '',
    minutes: ''
  })
  const [paymentPerHour, setPaymentPerHour] = useState('')

  useEffect(() => {
    if (data) {
      setPaidBreak({
        hours: String(Math.trunc(data.paid_break / 60)),
        minutes: String(data.paid_break % 60)
      })
      setPaymentPerHour(String(data.hour_cost))
    }
  }, [data])

  const [update, { isLoading: paymentLoading }] = useUpdatePaymentMutation()

  const mutate = useMutate()

  const updatePayment = async (paymentId: number) => {
    await mutate(
      async () => {
        await update({
          id: paymentId,
          hour_cost: Number(paymentPerHour),
          paid_break: Number(paidBreak.hours) * 60 + Number(paidBreak.minutes)
        })
      },
      {
        successMessage: 'Оплата Обновлена',
        errorMessage: 'Оплата Не Обновлена'
      }
    )
  }

  return {
    data,
    mainPaymentId: 1,
    isLoading,
    isFetching,
    updatePayment,
    paymentLoading,
    paidBreak,
    setPaidBreak,
    paymentPerHour,
    setPaymentPerHour
  }
}

export default usePayment

import { useEffect } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useUpdatePartialOrder from '../../hooks/useUpdatePartialOrder'

import { IOrder, IProductSpecs } from '../../../../../features/order/order.types'
import { useCreateAcceptanceMutation } from '../../../../../store/api/acceptance.api'
import { getFourDigitId } from '../../../../../utils'

type ModifiedProducts = IProductSpecs & { id: number }

const useCreateAcceptance = (order: IOrder | undefined) => {
  const [create, { data, isLoading: acceptanceLoading, error }] = useCreateAcceptanceMutation()
  const { updateOrder, isLoading: orderLoading } = useUpdatePartialOrder()
  const { notifyError, notifySuccess } = useNotifications()

  useEffect(() => {
    if (data && order) {
      updateOrder({ id: order.id, acceptance: data.id })
    }
  }, [data])

  const createAcceptance = () => {
    if (!order) return notifyError('Не указан заказ')

    if (!order?.real_in_moscow_date) return notifyError('Не указана дата прибытия в Москву')
    if (!order?.shipping_from_china_date) return notifyError('Не указана дата отправки из Китая')

    if (!order?.cargo_number) return notifyError('Не указан номер карго')
    if (!order?.cargo_volume) return notifyError('Не указан объем карго')
    if (!order?.cargo_weight) return notifyError('Не указан вес карго')

    const { products } = order

    create({
      title: `Приемка ${getFourDigitId(order.id)}`,
      products: (products as ModifiedProducts[]).map((p) => p.id),
      cargo_number: order.cargo_number,
      cargo_volume: order.cargo_volume,
      cargo_weight: order.cargo_weight,
      custom_id: null,
      arrived_in_moscow: order.real_in_moscow_date,
      shipped_from_china: order.shipping_from_china_date
    })
      .unwrap()
      .then(() => {
        notifySuccess('Приемка создана')
      })
      .catch(() => notifyError('Приемка не создана'))
  }

  const createAcceptanceFromOrder = () => {}

  return {
    createAcceptance,
    createAcceptanceFromOrder,
    isLoading: orderLoading || acceptanceLoading,
    error
  }
}

export default useCreateAcceptance

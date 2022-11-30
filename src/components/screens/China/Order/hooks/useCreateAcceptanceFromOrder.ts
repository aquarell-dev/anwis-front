import { useEffect } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useUpdatePartialOrder from '../../hooks/useUpdatePartialOrder'

import { IOrder } from '../../../../../features/order/order.types'
import { useCreateAcceptanceFromOrderMutation } from '../../../../../store/api/acceptance.api'

const useCreateAcceptanceFromOrder = (order: IOrder | undefined) => {
  const [createFromOrder, { data: createFromOrderResult, isLoading: acceptanceFromOrderLoading }] =
    useCreateAcceptanceFromOrderMutation()
  const { updateOrder, isLoading: orderLoading } = useUpdatePartialOrder()
  const { notifyError, notifySuccess } = useNotifications()

  useEffect(() => {
    if (createFromOrderResult && order) {
      updateOrder({ id: order.id, acceptance: createFromOrderResult.acceptance_id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createFromOrderResult])

  const createAcceptanceFromOrder = () => {
    if (!order) return

    createFromOrder({ order_id: order.id })
      .unwrap()
      .then(() => notifySuccess('Приемка создана'))
      .catch(() => notifyError('Приемка не создана'))
  }

  return {
    createAcceptanceFromOrder,
    isLoading: orderLoading || acceptanceFromOrderLoading
  }
}

export default useCreateAcceptanceFromOrder

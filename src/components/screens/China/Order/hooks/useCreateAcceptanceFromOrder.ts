import { useEffect } from 'react'

import useMutate from '../../../../../hooks/useMutate'
import useNotifications from '../../../../../hooks/useNotifications'
import useUpdatePartialOrder from '../../hooks/useUpdatePartialOrder'

import { IOrder } from '../../../../../features/order/order.types'
import { useCreateAcceptanceFromOrderMutation } from '../../../../../store/api/acceptance.api'

const useCreateAcceptanceFromOrder = () => {
  const [createFromOrder, { data: createFromOrderResult, isLoading: acceptanceFromOrderLoading }] =
    useCreateAcceptanceFromOrderMutation()
  const { updateOrder, isLoading: orderLoading } = useUpdatePartialOrder()

  const mutate = useMutate()

  const createAcceptanceFromOrder = async (order: IOrder) => {
    if (!order) return

    const result = await mutate(
      async () => await createFromOrder({ order_id: order.id }).unwrap(),
      {
        successMessage: 'Приемка создана',
        errorMessage: 'Приемка не создана'
      }
    )

    if (!result) return

    await mutate(
      async () => await updateOrder({ id: order.id, acceptance: result.acceptance_id }),
      { errorMessage: 'Заказ не был обновлен' }
    )
  }

  return {
    createAcceptanceFromOrder,
    isLoading: orderLoading || acceptanceFromOrderLoading
  }
}

export default useCreateAcceptanceFromOrder

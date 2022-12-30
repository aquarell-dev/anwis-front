import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'

import { orderService } from '../../../../../features/order/order.services'
import {
  ICreateUpdateOrder,
  IOrder,
  IProductSpecs
} from '../../../../../features/order/order.types'
import {
  useCreateOrderMutation,
  useUpdateOrderByIdMutation
} from '../../../../../store/api/order.api'
import { IOrderForm } from '../../types'

type SubmitOrder = {
  selectedProducts: IProductSpecs[]
  order?: IOrder
}

const useSubmitOrder = (args: SubmitOrder) => {
  const { selectedProducts, order } = args

  const { notifySuccess, notifyError } = useNotifications()

  const [redirectId, setRedirectId] = useState<number | null>(null)

  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderByIdMutation()
  const [createOrder, { data: createData, isLoading: createLoading }] = useCreateOrderMutation()

  const { currentSelectedIndividual } = useTypedSelector(state => state.individual)

  const router = useRouter()

  const creation = !order

  useEffect(() => {
    createData && setRedirectId((createData as unknown as IOrder).id)
  }, [createData])

  useEffect(() => {
    if (redirectId) router.push(`../../china/orders/${redirectId}`).catch(console.log)
  }, [redirectId])

  const onSubmit = (data: IOrderForm, redirect?: string) => {
    const transformedData: ICreateUpdateOrder = {
      ...orderService.transformSubmitData(data, selectedProducts),
      id: order?.id,
      individual_entrepreneur: currentSelectedIndividual.id
    }

    if (creation) {
      createOrder(transformedData)
        .unwrap()
        .then(() => {
          notifySuccess('Заказ успешно создан')
          redirect && router.push(redirect)
        })
        .catch(() => notifyError('Заказ не был создан'))
    } else if (!creation) {
      updateOrder(transformedData)
        .unwrap()
        .then(() => {
          notifySuccess('Заказ успешно обновлен')
          redirect && router.push(redirect)
        })
        .catch(() => notifyError('Заказ не был обновлен'))
    }
  }

  return { onSubmit, mutationLoading: createLoading || updateLoading }
}

export default useSubmitOrder

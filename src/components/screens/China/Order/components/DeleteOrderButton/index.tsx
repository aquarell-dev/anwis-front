import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import useNotifications from '../../../../../../hooks/useNotifications'

import { IOrder } from '../../../../../../features/order/order.types'
import { useDeleteOrderMutation } from '../../../../../../store/api/order.api'
import { getFourDigitId } from '../../../../../../utils'
import { RedButton } from '../../../../../ui/Button'
import ConfirmationPopup from '../../../../../ui/ConfirmationPopup'

const DeleteOrderButton: FC<{ order?: IOrder }> = ({ order }) => {
  const router = useRouter()
  const { notifyError, notifySuccess } = useNotifications()
  const [deleteOrder, _] = useDeleteOrderMutation()

  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      {order && (
        <>
          <RedButton
            type='button'
            text='Удалить'
            handler={() => setDeleteOpen(true)}
          />
          <ConfirmationPopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            deleteQuestion={`Вы уверены, что хотите удалить "Заказ ${getFourDigitId(order.id)}"`}
            onConfirm={() =>
              deleteOrder(order.id)
                .unwrap()
                .then(async () => {
                  notifySuccess('Заказ был успешно удален')
                  await router.push('../orders')
                })
                .catch(() => notifyError('Заказ не был удален'))
            }
          />
        </>
      )}
    </>
  )
}

export default DeleteOrderButton

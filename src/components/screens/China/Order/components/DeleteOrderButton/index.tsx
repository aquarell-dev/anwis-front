import { FC, useState } from 'react'

// import { useNavigate } from 'react-router-dom'
import useNotifications from '../../../../../../hooks/useNotifications'

import { IOrder } from '../../../../../../features/order/order.types'
import { useDeleteOrderMutation } from '../../../../../../store/api/order.api'
import { getFourDigitId } from '../../../../../../utils'
import { RedButton } from '../../../../../ui/Button'
import ConfirmationPopup from '../../../../../ui/ConfirmationPopup'

const DeleteOrderButton: FC<{ order?: IOrder }> = ({ order }) => {
  // const navigate = useNavigate()
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
                .then(() => {
                  notifySuccess('Заказ был успешно удален')
                  // navigate('../orders')
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

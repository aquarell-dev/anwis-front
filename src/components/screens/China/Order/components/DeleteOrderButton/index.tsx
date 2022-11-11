import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useNotifications from '../../../../../../hooks/useNotifications';
import { useDeleteOrderMutation } from '../../../../../../store/api/order.api';

import { RedButton } from '../../../../../ui/Button';

import { IOrder } from '../../../../../../features/order/order.types';
import DeletePopup from '../../../components/DeletePopup';
import { getFourDigitId } from '../../../../../../utils';


const DeleteOrderButton: FC<{ order?: IOrder }> = ({ order }) => {
  const navigate = useNavigate();
  const { notifyError, notifySuccess } = useNotifications();
  const [deleteOrder, _] = useDeleteOrderMutation();

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      {order && (
        <>
          <RedButton
            type='button'
            text='Удалить'
            handler={() => setDeleteOpen(true)}
          />
          <DeletePopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            content={`Заказ ${getFourDigitId(order.id)}`}
            onDelete={() => deleteOrder(order.id)
              .unwrap()
              .then(() => {
                notifySuccess('Заказ был успешно удален');
                navigate('../orders');
              })
              .catch(() => notifyError('Заказ не был удален'))}
          />
        </>
      )}
    </>
  );
};

export default DeleteOrderButton;

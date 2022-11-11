import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { useCreateOrderMutation, useUpdateOrderByIdMutation } from '../../../../../store/api/order.api';
import useNotifications from '../../../../../hooks/useNotifications';

import { IOrderForm } from '../../types';
import { ICreateUpdateOrder, IOrder, IProductSpecs } from '../../../../../features/order/order.types';

import { orderService } from '../../../../../features/order/order.services';


type SubmitOrder = {
  selectedProducts: IProductSpecs[],
  order?: IOrder
}

const useSubmitOrder = (args: SubmitOrder) => {
  const { selectedProducts, order } = args;

  const { notifySuccess, notifyError } = useNotifications();

  const [redirectId, setRedirectId] = useState<number | null>(null);

  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderByIdMutation();
  const [createOrder, { data: createData, isLoading: createLoading }] = useCreateOrderMutation();

  const { currentSelectedIndividual } = useTypedSelector(state => state.individual);

  const navigate = useNavigate();

  const creation = !order;

  useEffect(() => {
    createData && setRedirectId((createData as unknown as IOrder).id);
  }, [createData]);

  useEffect(() => {
    if (redirectId) navigate(`../../china/orders/${redirectId}`)
  }, [redirectId]);

  const onSubmit = (data: IOrderForm, redirect?: string) => {
    const transformedData: ICreateUpdateOrder = {
      ...orderService.transformSubmitData(data, selectedProducts),
      id: order?.id,
      individual_entrepreneur: currentSelectedIndividual.id
    };

    if (creation) {
      createOrder(transformedData)
        .unwrap()
        .then(() => { notifySuccess('Заказ успешно создан'); redirect && navigate(redirect) })
        .catch(() => notifyError('Заказ не был создан'))
    } else if (!creation) {
      updateOrder(transformedData)
        .unwrap()
        .then(() => { notifySuccess('Заказ успешно обновлен'); redirect && navigate(redirect) })
        .catch(() => notifyError('Заказ не был обновлен'))
    }
  };

  return { onSubmit, mutationLoading: createLoading || updateLoading };
};

export default useSubmitOrder;
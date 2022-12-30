import { IOrder, PartialOrder } from '../../../../features/order/order.types';

import useNotifications from '../../../../hooks/useNotifications';
import { useUpdateOrderPartialByIdMutation } from '../../../../store/api/order.api';

type UpdateOrderReturn = {
  updateOrder: (order: PartialOrder, onSuccess?: () => void, onError?: () => void) => void,
  order?: IOrder,
  isLoading: boolean,
  error: boolean,
}

const useUpdatePartialOrder = (): UpdateOrderReturn => {
  const [update, { data, isLoading, error }] = useUpdateOrderPartialByIdMutation();
  const { notifySuccess, notifyError } = useNotifications();

  const updateOrder = (order: PartialOrder, onSuccess?: () => void, onError?: () => void) => {
    update(order)
      .unwrap()
      .then(() => {
        notifySuccess('Заказ был успешно обновлен');
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        notifyError('Заказ не было обновлен');
        if (onError) onError();
      });
  };

  return { updateOrder, order: data as unknown as IOrder, isLoading, error: !!error };
};

export default useUpdatePartialOrder;
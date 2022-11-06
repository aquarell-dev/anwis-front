import { PartialOrder } from '../../../../features/order/order.types';

import useNotifications from '../../../../hooks/useNotifications';
import { useUpdateOrderPartialByIdMutation } from '../../../../store/api/order.api';

const useUpdatePartialOrder = (): (order: PartialOrder, onSuccess?: () => void, onError?: () => void) => void => {
  const [update, _] = useUpdateOrderPartialByIdMutation();
  const { notifySuccess, notifyError } = useNotifications();

  return (order: PartialOrder, onSuccess?: () => void, onError?: () => void) => {
    update(order)
      .unwrap()
      .then(() => {
        notifySuccess('Заказ был успешно обновлен');
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        notifyError('Заказ не было обновлен');
        if (onError) onError();
      })
  };
};

export default useUpdatePartialOrder;
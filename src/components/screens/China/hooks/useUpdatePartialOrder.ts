import { PartialOrder } from '../../../../features/order/types';
import { useUpdateOrderPartialByIdMutation } from '../../../../features/order/orderApi';
import { notifyError, notifySuccess } from '../../../../utils/notify';

const useUpdatePartialOrder = () => {
  const [update, _] = useUpdateOrderPartialByIdMutation();

  return (order: PartialOrder) => {
    update(order)
      .unwrap()
      .then(() => notifySuccess('Заказ был успешно обновлен'))
      .catch(() => notifyError('Заказ не было обновлен'))
  };
};

export default useUpdatePartialOrder;
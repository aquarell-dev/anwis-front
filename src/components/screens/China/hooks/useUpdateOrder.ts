import { IOrder, IProductSpecs, IStatus } from '../../../../features/order/types';

import { notifyError, notifySuccess } from '../../../../utils/notify';
import { orderService } from '../../../../features/order/orderServices';

import { useUpdateOrderByIdMutation } from '../../../../features/order/orderApi';
import { useNavigate } from 'react-router-dom';


interface UpdateOrderArgs {
  order: IOrder | undefined;
  statuses: IStatus[];
  selectedProducts: IProductSpecs[];
}


const useUpdateOrder = () => {
  const [updateOrder, _] = useUpdateOrderByIdMutation();
  const navigate = useNavigate();

  const updateOrderAndGoNextStatus = (args: UpdateOrderArgs) => {
    const { order, statuses, selectedProducts } = args;

    if (!order) return notifyError('Не создан заказ');

    const nextStatus = statuses.find(status => status.status === 'Заказ оформлен');

    if (!nextStatus) return notifyError('Не найден статус');

    updateOrder(orderService.updateAndTransformOrder(order, nextStatus.id, selectedProducts))
      .unwrap()
      .then(() => { notifySuccess('Заказ успешно обновлен'); })
      .catch(() => notifyError('Заказ не был обновлен'))
  };

  return [updateOrderAndGoNextStatus];
};

export default useUpdateOrder;
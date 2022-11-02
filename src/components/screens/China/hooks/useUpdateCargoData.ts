import { notifyError, notifySuccess } from '../../../../utils/notify';
import { useUpdateOrderPartialByIdMutation } from '../../../../features/order/orderApi';
import { ICargoInfo, IOrder } from '../../../../features/order/types';


const useUpdateCargoData = ({ order }: { order?: IOrder }) => {
  const [updateOrder, _] = useUpdateOrderPartialByIdMutation();

  const updateOrderData = (cargoInfo: Partial<ICargoInfo>) => {
    let k = 0;

    Object.entries(cargoInfo).forEach(inf => {
      const [key, value] = inf;
      if (!value) k++;
    });

    if (!order) return notifyError('Не указан заказ');
    if (k > 0) return notifyError('Заполните все поля');

    updateOrder({ ...cargoInfo, id: order.id })
      .unwrap()
      .then(() => notifySuccess('Заказ успешно обновлен'))
      .catch(() => notifyError('Заказ не был обновлен'))
  };

  return [updateOrderData];
};

export default useUpdateCargoData;
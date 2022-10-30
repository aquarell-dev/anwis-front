import { FC } from 'react';
import { IOrder } from '../../../../../features/order/types';

const Total: FC<{ order: IOrder | undefined }> = ({ order }) => {
  return (
    <div className='flex items-center space-x-4'>
      <p>Сумма в рублях {order?.total_rub}</p>
      <p>Сумма в юанях {order?.total_cny}</p>
      <p>Кол-во товаров {order?.total_quantity}</p>
      <p>Доп. затраты в рублях {order?.total_expenses}</p>
    </div>
  );
};

export default Total;
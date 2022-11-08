import { FC, useMemo } from 'react';

import { getFourDigitId } from '../../../../../../utils';

import { IOrder } from '../../../../../../features/order/order.types';

const Header: FC<{ order?: IOrder }> = ({ order }) => {
  const date = useMemo(
    () => order ? order.date : new Date().toLocaleTimeString('en-GB') + ' ' + new Date().toLocaleDateString('en-GB'),
    []
  );

  return (
    <h1 className='text-3xl mb-3'>
      Заказ {getFourDigitId(order?.id)} поставщику
      в <span className='underline text-indigo-600'>Китай</span> от {date}
    </h1>
  );
};

export default Header;
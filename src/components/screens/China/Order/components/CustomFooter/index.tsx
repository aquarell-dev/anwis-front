import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import { IOrder } from '../../../../../../features/order/order.types';

const CustomFooter: FC<{
  order: IOrder | undefined
}> = ({ order }) => {
  return (
    <>
      {order && (
        <Box className='p-4 flex items-center space-x-8'>
          <p>Сумма ¥: {order.total_cny}</p>
          <p>Сумма ₽: {order.total_rub}</p>
          <p>Сумма доп. затрат ₽: {order.total_expenses}</p>
          <p>Количество товаров: {order.total_quantity}</p>
        </Box>
      )
      }
    </>
  );
};

export default CustomFooter;
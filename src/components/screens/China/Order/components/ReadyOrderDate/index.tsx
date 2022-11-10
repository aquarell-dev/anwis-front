import { FC, useEffect, useState } from 'react';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';
import { Alert } from '@mui/material';
import moment from 'moment';

import { IndigoButton, RedButton } from '../../../../../ui/Button';

import { convertDateToUSFormat, getDateDiff } from '../../../../../../utils';

import { IOrder, TStatuses } from '../../../../../../features/order/order.types';
import { CustomDatePicker } from '../../../../../ui/DateTime';
import useNotifications from '../../../../../../hooks/useNotifications';
import Expand from 'react-expand-animated';


const ReadyOrderDate: FC<{
  order: IOrder | undefined,
  selectedStatus: TStatuses,
  show: (dependableStatus: TStatuses) => (boolean | undefined)
}> = ({ order, selectedStatus, show }) => {
  const orderDate = order?.ready_date ? convertDateToUSFormat(order.ready_date) : new Date();

  const [expanded, setExpanded] = useState(true);
  const [readyDate, setReadyDate] = useState(moment(order ? orderDate : '', 'DD/MM/YYYY'));

  const { notifyError } = useNotifications();
  const { updateOrder } = useUpdatePartialOrder();

  useEffect(() => {
    if (show('Отправлен из Китая')) setExpanded(false);
  }, [selectedStatus]);

  let daysLeft = undefined;

  if (order) daysLeft = getDateDiff(orderDate, new Date());

  return (
    <div className='flex items-start space-x-4'>
      <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out cursor-pointer rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          )}
        </svg>
      </div>
      <Expand
        open={expanded}
        className='flex items-center space-x-4'
      >
        <div className="w-[420px]">
          <Alert
            variant="filled"
            severity={order?.ready ? 'success' : daysLeft ? daysLeft <= 5 ? 'error' : 'success' : 'error'}
            className='flex items-center'
            style={{
              color: 'white',
              backgroundColor: !order?.ready_date && !order?.ready ? '#fb7185' : undefined
            }}
          >
            {order?.ready ? (
              <p className='text-xl'>Товар уже изготовлен</p>
            ) : daysLeft ?
              (daysLeft <= 0) ? <p className='text-xl'>Товар уже изготовлен</p> :
                <p className='text-xl'>Дней до изготовления товара: <span className='font-bold'>{daysLeft}</span></p>
              : !order?.cargo_number ? <p className='text-xl'>Укажите дату изготовления товара</p> :
                <p className='text-xl'>Неизвестная ошибка</p>
            }
          </Alert>
        </div>
        <CustomDatePicker
          label="Дата изготовления"
          value={readyDate}
          setValue={setReadyDate}
        />
        <IndigoButton
          type={'button'}
          text={'Сохранить'}
          handler={() => {
            if (!order) return notifyError('Не указан заказ');
            updateOrder({ id: order.id, ready_date: readyDate.format('DD/MM/YYYY'), ready: false });
          }}
        />
        <RedButton
          type={'button'}
          text={'Товар есть в наличии в Китае'}
          customWidth='w-80'
          handler={() => {
            if (!order) return notifyError('Не указан заказ');
            updateOrder({ id: order.id, ready: true });
          }}
        />
      </Expand>
    </div>
  );
};

export default ReadyOrderDate;
import * as React from 'react';
import { FC, useState } from 'react';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { IndigoButton } from '../../../../ui/Button';
import { useUpdateOrderPartialByIdMutation } from '../../../../../features/order/orderApi';
import { notifyError, notifySuccess } from '../../../../../utils/notify';
import { IOrder } from '../../../../../features/order/types';


const ReadyOrderDate: FC<{ order: IOrder | undefined }> = ({ order }) => {
  const [readyDate, setReadyDate] = useState(moment(order ? new Date(order.ready_date).toLocaleDateString() : '01/01/2022', 'MM/DD/YYYY'));

  const [updateOrder, _] = useUpdateOrderPartialByIdMutation();

  const current = new Date();

  let daysLeft = undefined;

  if (order) daysLeft = Math.ceil(
    (new Date(order.ready_date).getTime() - current.getTime()) / (1000 * 3600 * 24)
  );

  return (
    <div className='flex items-center space-x-4'>
      <div className="w-96 p-2 border border-gray-300">
        {
          daysLeft ?
            daysLeft <= 0 ? <p>Товар уже изготовлен</p> : <p>Дней до изготовления товара: <span className='font-medium'>{daysLeft}</span></p>
            :
            <p>Неизвестная ошибка</p>
        }
      </div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Дата изготовления"
          openTo="month"
          views={['year', 'month', 'day']}
          value={readyDate}
          onChange={(newValue) => {
            newValue && setReadyDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <IndigoButton
        type={'button'}
        text={'Сохранить'}
        handler={() => {
          if (!order) return notifyError('Не указан заказ');

          updateOrder({ id: order.id, ready_date: readyDate.format('DD/MM/YYYY') })
            .unwrap()
            .then(() => notifySuccess('Дата изготовления создана'))
            .catch(() => notifyError('Дата изготовления не создана'));
        }}
      />
    </div>
  );
};

export default ReadyOrderDate;
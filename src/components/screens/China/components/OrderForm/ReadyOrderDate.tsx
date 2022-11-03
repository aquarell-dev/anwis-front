import { FC, useState } from 'react';
import useUpdatePartialOrder from '../../hooks/useUpdatePartialOrder';

import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

import { IndigoButton } from '../../../../ui/Button';

import { notifyError } from '../../../../../utils/notify';
import { convertDateToUSFormat, getDateDiff } from '../../../../../utils';

import { IOrder } from '../../../../../features/order/types';


const ReadyOrderDate: FC<{ order: IOrder | undefined }> = ({ order }) => {
  const orderDate = order?.ready_date ? convertDateToUSFormat(order.ready_date) : new Date();

  const [readyDate, setReadyDate] = useState(moment(order ? orderDate : '', 'DD/MM/YYYY'));

  const updateOrder = useUpdatePartialOrder();

  let daysLeft = undefined;

  if (order) daysLeft = getDateDiff(orderDate, new Date());

  return (
    <div className='flex items-center space-x-4'>
      <div className="w-96">
        <Alert
          variant="filled"
          severity={daysLeft ? daysLeft <= 5 ? 'error' : 'success' : 'error'}
          className='flex items-center'
        >
          {daysLeft ?
            daysLeft <= 0 ? <p className='text-xl'>Товар уже изготовлен</p> :
              <p className='text-xl'>Дней до изготовления товара: <span className='font-bold'>{daysLeft}</span></p>
            :
            <p className='text-xl'>Неизвестная ошибка</p>
          }
        </Alert>
      </div>
      <LocalizationProvider
        adapterLocale={moment.locale('ru')}
        dateAdapter={AdapterMoment}
      >
        <DatePicker
          label="Дата изготовления"
          openTo="day"
          views={['year', 'month', 'day']}
          inputFormat='DD/MM/yyyy'
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
          updateOrder({ id: order.id, ready_date: readyDate.format('DD/MM/YYYY') });
        }}
      />
    </div>
  );
};

export default ReadyOrderDate;
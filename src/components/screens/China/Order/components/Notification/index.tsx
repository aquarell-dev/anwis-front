import React, { FC, useState } from 'react';
import useNotifications from '../../../../../../hooks/useNotifications';

import moment from 'moment';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { IndigoButton } from '../../../../../ui/Button';
import { Input } from '../../../../../ui/Input';
import Tasks from '../Tasks';
import { SpinnerComponent } from 'react-element-spinner';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';
import { IOrder } from '../../../../../../features/order/order.types';


// had to use js cause were unable to find types for the expand lib

const Notification: FC<{ order?: IOrder }> = ({ order }) => {
  const [notification, setNotification] = useState('');
  const [dateTime, setDateTime] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm'));

  const { notifyError } = useNotifications();

  const { updateOrder, isLoading: orderLoading } = useUpdatePartialOrder();

  return (
    <>
      <div className='z-[40] flex flex-col space-y-4'>
        <div className="flex items-center space-x-4">
          <div className="w-96">
            <Input
              value={notification}
              customWidth='w-96'
              handler={e => setNotification(e.target.value)}
              placeholder={'Новая задача...'}
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              className='w-96'
              renderInput={(props) => <TextField {...props} />}
              label="Дата и время"
              value={dateTime}
              onChange={(newValue) => {
                newValue && setDateTime(newValue);
              }}
              inputFormat={'HH:mm DD/MM/yyyy'}
            />
          </LocalizationProvider>
          <IndigoButton
            type={'button'}
            text={'Создать'}
            customWidth={'w-60'}
            handler={() => {
              if (!order) return notifyError('Заказ не был обновлен');

              updateOrder({
                id: order.id, tasks: [...order.tasks, { datetime: dateTime, task: notification }].map(t => ({
                  ...t,
                  datetime: new Date(t.datetime).toISOString()
                }))
              });
            }}
          >
            {orderLoading && <SpinnerComponent
              loading={true}
              position={'centered'}
            />}
          </IndigoButton>
        </div>
      </div>
      <Tasks order={order}/>
    </>
  );
};

export default Notification;
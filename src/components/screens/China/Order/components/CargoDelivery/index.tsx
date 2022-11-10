import React, { FC, useState } from 'react';
import Alert from '@mui/material/Alert';
import { IndigoButton } from '../../../../../ui/Button';
import { CustomDatePicker } from '../../../../../ui/DateTime';
import { ICargoInfo, IOrder, IStatus, TStatuses } from '../../../../../../features/order/order.types';
import { convertDateToUSFormat, getDateDiff } from '../../../../../../utils';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';
import { SetState } from '../../../../../../utils/types';
import moment from 'moment';

const CargoDelivery: FC<{
  order?: IOrder,
  statuses: IStatus[],
  setSelectedStatus: SetState<TStatuses>,
  inMoscow: moment.Moment,
  setInMoscow: SetState<moment.Moment>,
  cargoInfo: ICargoInfo
}> = ({ order, statuses, setSelectedStatus, inMoscow, setInMoscow, cargoInfo }) => {
  const { updateOrder } = useUpdatePartialOrder();

  let daysLeftTillInMoscow;

  if (order?.in_moscow_date)
    daysLeftTillInMoscow = getDateDiff(convertDateToUSFormat(order?.in_moscow_date), new Date());

  if (!order) return <></>;

  if (!order.delivered && !order.in_moscow_date)
    return (
      <Alert
        variant="outlined"
        severity={'info'}
        className='flex items-center'
      >
        <p className='text-xl'>
          Укажите дату приезда в Москву
        </p>
      </Alert>
    );

  if (order.delivered)
    return (
      <Alert
        variant="outlined"
        severity={'success'}
        className='flex items-center'
      >
        <p className='text-xl'>
          Товар уже в Москве
        </p>
      </Alert>
    );

  if (daysLeftTillInMoscow && daysLeftTillInMoscow > 5)
    return (
      <Alert
        variant="outlined"
        severity='info'
        className='flex items-center'
      >
        <p className='text-xl'>
          Дней до приезда в
          Москву: <span className='underline text-indigo-600 text-2xl font-bold'>{daysLeftTillInMoscow}</span>
        </p>
      </Alert>
    );

  if (daysLeftTillInMoscow && daysLeftTillInMoscow > 1 && daysLeftTillInMoscow <= 5)
    return (
      <Alert
        variant="outlined"
        severity='warning'
        className='flex items-center'
      >
        <p className='text-xl'>
          Дней до приезда в
          Москву: <span className='underline text-indigo-600 text-2xl font-bold'>{daysLeftTillInMoscow}</span>
        </p>
      </Alert>
    );

  return (
    <div className='w-full flex items-center space-x-4 py-2 px-4 border border-red-500 rounded-md'>
      <p className='text-xl font-medium'>Доставка просрочена;</p>
      <div className="flex items-center space-x-4">
        <p>Выберите новую дату доставки или нажмите "Товар уже приехал": </p>
        <CustomDatePicker
          label='Дата новой доставки в Москву'
          value={inMoscow}
          setValue={setInMoscow}
        />
        <IndigoButton
          type={'button'}
          text={'Сохранить'}
          handler={() => order && updateOrder({
            id: order.id,
            in_moscow_date: cargoInfo.in_moscow_date,
            delivered: false
          })}
        />
      </div>
    </div>
  );
};

export default CargoDelivery;

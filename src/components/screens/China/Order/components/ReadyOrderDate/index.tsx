import { Alert } from '@mui/material';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';

import { IndigoButton, RedButton } from '../../../../../ui/Button';

import { convertDateToUSFormat, getDateDiff } from '../../../../../../utils';

import Expand from 'react-expand-animated';
import { IOrder, TStatuses } from '../../../../../../features/order/order.types';
import useNotifications from '../../../../../../hooks/useNotifications';
import { CustomDatePicker } from '../../../../../ui/DateTime';

const ReadyOrderDate: FC<{
  order: IOrder | undefined;
  selectedStatus: TStatuses;
  show: (dependableStatus: TStatuses) => boolean | undefined;
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
    <div className="flex flex-col items-center xl:items-start 2xl:flex-row 2xl:items-center 2xl:space-y-0 space-y-4 2xl:space-x-4">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center space-x-4 2xl:space-x-0 justify-center p-2 w-80 2xl:w-8 h-8 bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out cursor-pointer rounded-lg"
      >
        <p className="text-white block 2xl:d-none">Раскрыть</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
          style={{ flex: '0 0 auto' }}
        >
          {expanded ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          )}
        </svg>
      </div>
      <Expand
        open={expanded}
        className="flex flex-col space-y-2 xl:flex-row xl:items-center xl:space-y-0 xl:space-x-4"
      >
        <div className="w-80 xl:w-[420px]">
          <Alert
            variant="filled"
            severity={
              order?.ready ? 'success' : daysLeft ? (daysLeft <= 5 ? 'error' : 'success') : 'error'
            }
            className="flex items-center"
            style={{
              color: 'white',
              backgroundColor: !order?.ready_date && !order?.ready ? '#fb7185' : undefined
            }}
          >
            {order?.ready ? (
              <p className="text-sm 2xl:text-xl">Товар уже изготовлен</p>
            ) : daysLeft ? (
              daysLeft <= 0 ? (
                <p className="text-sm 2xl:text-xl">Товар уже изготовлен</p>
              ) : (
                <p className="text-sm 2xl:text-xl">
                  Дней до изготовления товара: <span className="font-bold">{daysLeft}</span>
                </p>
              )
            ) : !order?.cargo_number ? (
              <p className="text-sm 2xl:text-xl">Укажите дату изготовления товара</p>
            ) : (
              <p className="text-sm 2xl:text-xl">Неизвестная ошибка</p>
            )}
          </Alert>
        </div>
        <CustomDatePicker label="Дата изготовления" value={readyDate} setValue={setReadyDate} />
        <IndigoButton
          type={'button'}
          text={'Сохранить'}
          customWidth="w-80 xl:w-60"
          handler={() => {
            if (!order) return notifyError('Не указан заказ');
            updateOrder({ id: order.id, ready_date: readyDate.format('DD/MM/YYYY'), ready: false });
          }}
        />
        <RedButton
          type={'button'}
          text={'Товар есть в наличии в Китае'}
          customWidth="w-80"
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

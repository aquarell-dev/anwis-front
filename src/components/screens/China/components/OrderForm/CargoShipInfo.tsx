import * as React from 'react';
import { FC, useState } from 'react';
import { GreenButton, IndigoButton, RedButton } from '../../../../ui/Button';
import Expand from 'react-expand-animated';
import { FancyInput } from '../../../../ui/Input';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { ICargoInfo, IOrder } from '../../../../../features/order/types';
import Alert from '@mui/material/Alert';
import { getDateDiff } from '../../../../../utils';
import useUpdateCargoData from '../../hooks/useUpdateCargoData';
import { notifySuccess } from '../../../../../utils/notify';


const CargoShipInfo: FC<{ order?: IOrder }> = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [cargoInfo, setCargoInfo] = useState<ICargoInfo>({
    cargo_number: order?.cargo_number ?? '',
    cargo_weight: order?.cargo_weight ?? '',
    cargo_volume: order?.cargo_volume ?? '',
    price_per_kg: order?.price_per_kg ?? 0,
    package_price: order?.package_price ?? 0,
    total_delivery: order?.total_delivery ?? 0,
    shipping_from_china_date: order?.shipping_from_china_date ?
      moment(order.shipping_from_china_date).format('DD/MM/YYYY')
      : moment().format('DD/MM/YYYY'),
    in_moscow_date: order?.in_moscow_date ?
      moment(order.in_moscow_date).format('DD/MM/YYYY')
      : moment(null).format('DD/MM/YYYY'),
  });
  const [hasBeenDelivered, setHasBeenDelivered] = useState(true);

  const dateDiff = getDateDiff({ biggerDate: new Date(order?.in_moscow_date ?? ''), smallerDate: new Date() });

  const [updateOrder] = useUpdateCargoData({ order });

  return (
    <div className='w-full flex justify-between'>
      <div className="flex flex-col space-y-2">
        <IndigoButton
          type={'button'}
          text={'Загрузить файл карго'}
          customWidth={'w-60'}
          handler={() => {
          }}
        />
        <GreenButton
          type={'button'}
          text={'Заполнить вручную'}
          customWidth={'w-60'}
          handler={() => setOpen(!open)}
        />
        <IndigoButton
          type={'button'}
          customWidth={'w-60'}
          text={'Сохранить'}
          handler={() => updateOrder(cargoInfo)}
        />
        <Expand open={open}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-4">
            <FancyInput
              type={'text'}
              value={cargoInfo.cargo_number}
              handler={(e) => setCargoInfo(prev => ({ ...prev, cargo_number: e.target.value }))}
              placeholder={'Номер доставки'}
              showLabel
            />
            <FancyInput
              type={'text'}
              value={cargoInfo.cargo_weight}
              handler={(e) => setCargoInfo(prev => ({ ...prev, cargo_weight: e.target.value }))}
              placeholder={'Вес'}
              showLabel
            />
            <FancyInput
              type={'text'}
              value={cargoInfo.cargo_volume}
              handler={(e) => setCargoInfo(prev => ({ ...prev, cargo_volume: e.target.value }))}
              placeholder={'Объем'}
              showLabel
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Дата Отправки из Китая"
                openTo="month"
                views={['year', 'month', 'day']}
                inputFormat={'DD/MM/YYYY'}
                value={cargoInfo.shipping_from_china_date}
                onChange={(newValue) => {
                  newValue && setCargoInfo(prev => ({ ...prev, shipping_from_china_date: newValue }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FancyInput
              type={'number'}
              value={cargoInfo.price_per_kg}
              handler={(e) => setCargoInfo(prev => ({ ...prev, price_per_kg: parseFloat(e.target.value) }))}
              placeholder={'Цена за 1кг'}
              showLabel
            />
            <FancyInput
              type={'number'}
              value={cargoInfo.package_price}
              handler={(e) => setCargoInfo(prev => ({ ...prev, package_price: parseFloat(e.target.value) }))}
              placeholder={'Стоимость упаковки'}
              showLabel
            />
            <FancyInput
              type={'number'}
              value={cargoInfo.total_delivery}
              handler={(e) => setCargoInfo(prev => ({ ...prev, total_delivery: parseFloat(e.target.value) }))}
              placeholder={'Общая сумма'}
              showLabel
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Доставка в Москву"
                openTo="month"
                views={['year', 'month', 'day']}
                value={cargoInfo.in_moscow_date}
                inputFormat={'DD/MM/YYYY'}
                onChange={(newValue) => {
                  newValue && setCargoInfo(prev => ({ ...prev, in_moscow_date: newValue }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Expand>
        {order && dateDiff > 0 ? (
          <Alert
            variant="outlined"
            severity={dateDiff <= 5 ? 'error' : 'success'}
          >
            <p>Дней до приезда в Москву: <span className='underline text-indigo-600'>{dateDiff}</span></p>
          </Alert>
        ) : (
          <div className='w-full py-2 flex flex-col space-y-4 px-4 border border-red-500 rounded-md'>
            <div className="flex items-center space-x-4">
              <p>Была ли доставка <span className='font-medium'>{order?.in_moscow_date}</span>?</p>
              <IndigoButton
                type={'button'}
                text={'Да'}
                handler={() => { updateOrder({  }); }}
              />
              <RedButton
                type={'button'}
                text={'Нет'}
                handler={() => {
                  setHasBeenDelivered(false);
                }}
              />
            </div>
            {!hasBeenDelivered && (
              <div className="flex items-center space-x-4">
                <p>Выберите новую дату доставки: </p>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Доставка в Москву"
                    openTo="month"
                    views={['year', 'month', 'day']}
                    value={cargoInfo.in_moscow_date}
                    inputFormat={'DD/MM/YYYY'}
                    onChange={(newValue) => {
                      newValue && setCargoInfo(prev => ({ ...prev, inMoscowDate: newValue }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CargoShipInfo;
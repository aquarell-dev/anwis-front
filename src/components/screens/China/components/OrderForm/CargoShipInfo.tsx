import { FC, useState } from 'react';
import { GreenButton, IndigoButton } from '../../../../ui/Button';
import Expand from 'react-expand-animated';
import { FancyInput } from '../../../../ui/Input';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import moment from 'moment';

const CargoShipInfo: FC = () => {
  const [open, setOpen] = useState(false);
  const [cargoInfo, setCargoInfo] = useState({
    cargoNumber: '',
    cargoWeight: '',
    cargoVolume: '',
    pricePerKg: '',
    packagePrice: '',
    totalPrice: '',
    shippingFromChinaDate: moment(),
    inMoscowDate: moment(null),
  });

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
          handler={() => {
          }}
        />
        <Expand open={open}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-4">
            <FancyInput
              type={'input'}
              value={cargoInfo.cargoNumber}
              handler={(e) => setCargoInfo(prev => ({ ...prev, cargoNumber: e.target.value }))}
              placeholder={'Номер доставки'}
            />
            <FancyInput
              type={'input'}
              value={cargoInfo.cargoWeight}
              handler={(e) => setCargoInfo(prev => ({ ...prev, cargoWeight: e.target.value }))}
              placeholder={'Вес'}
            />
            <FancyInput
              type={'input'}
              value={cargoInfo.cargoVolume}
              handler={(e) => setCargoInfo(prev => ({ ...prev, cargoVolume: e.target.value }))}
              placeholder={'Объем'}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Дата Отправки из Китая"
                openTo="month"
                views={['year', 'month', 'day']}
                inputFormat={'DD/MM/YYYY'}
                value={cargoInfo.shippingFromChinaDate}
                onChange={(newValue) => {
                  newValue && setCargoInfo(prev => ({ ...prev, shippingFromChinaDate: newValue }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FancyInput
              type={'input'}
              value={cargoInfo.pricePerKg}
              handler={(e) => setCargoInfo(prev => ({ ...prev, pricePerKg: e.target.value }))}
              placeholder={'Цена за 1кг'}
            />
            <FancyInput
              type={'input'}
              value={cargoInfo.packagePrice}
              handler={(e) => setCargoInfo(prev => ({ ...prev, packagePrice: e.target.value }))}
              placeholder={'Стоимость упаковки'}
            />
            <FancyInput
              type={'input'}
              value={cargoInfo.totalPrice}
              handler={(e) => setCargoInfo(prev => ({ ...prev, totalPrice: e.target.value }))}
              placeholder={'Общая сумма'}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Доставка в Москву"
                openTo="month"
                views={['year', 'month', 'day']}
                value={cargoInfo.inMoscowDate}
                inputFormat={'DD/MM/YYYY'}
                onChange={(newValue) => {
                  newValue && setCargoInfo(prev => ({ ...prev, inMoscowDate: newValue }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Expand>
      </div>
    </div>
  );
};

export default CargoShipInfo;
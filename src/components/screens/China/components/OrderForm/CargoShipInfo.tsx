import { FC, useState } from 'react';
import { GreenButton, IndigoButton } from '../../../../ui/Button';
import Expand from 'react-expand-animated';
import { FancyInput } from '../../../../ui/Input';

const CargoShipInfo: FC = () => {
  const [open, setOpen] = useState(false);
  const [cargoInfo, setCargoInfo] = useState({
    cargoNumber: '',
    cargoWeight: '',
    cargoVolume: '',
    pricePerKg: '',
    packagePrice: '',
    totalPrice: '',
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
        <Expand open={open}>
          <div className="flex flex-col space-y-4">
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
            <IndigoButton type={'button'} text={'Сохранить'} handler={() => {}} />
          </div>
        </Expand>
      </div>
    </div>
  );
};

export default CargoShipInfo;
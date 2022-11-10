import React, { FC } from 'react';
import { FancyInput } from '../../../../../ui/Input';
import { ICargoInfo } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';

const CargoInputs: FC<{ cargoInfo: ICargoInfo, setCargoInfo: SetState<ICargoInfo> }> = ({ cargoInfo, setCargoInfo }) => {
  return (
    <>
      <FancyInput
        type={'text'}
        value={cargoInfo.cargo_number}
        handler={(e) => setCargoInfo(prev => ({ ...prev, cargo_number: e.target.value }))}
        placeholder={'Номер Карго'}
        showLabel
      />
      <FancyInput
        type={'text'}
        value={cargoInfo.cargo_weight}
        handler={(e) => setCargoInfo(prev => ({ ...prev, cargo_weight: e.target.value }))}
        placeholder={'Вес, КГ'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.packages}
        handler={(e) => setCargoInfo(prev => ({ ...prev, packages: parseInt(e.target.value) }))}
        placeholder={'Кол-во мешков/коробок'}
        showLabel
      />
      <FancyInput
        type={'text'}
        value={cargoInfo.cargo_volume}
        handler={(e) => setCargoInfo(prev => ({ ...prev, cargo_volume: e.target.value }))}
        placeholder={'Объем, М3'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.price_per_kg}
        handler={(e) => setCargoInfo(prev => ({ ...prev, price_per_kg: parseFloat(e.target.value) }))}
        placeholder={'Цена за 1кг, $'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.package_price}
        handler={(e) => setCargoInfo(prev => ({ ...prev, package_price: parseFloat(e.target.value) }))}
        placeholder={'Стоимость упаковки, $'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.total_delivery}
        handler={(e) => setCargoInfo(prev => ({ ...prev, total_delivery: parseFloat(e.target.value) }))}
        placeholder={'Общая сумма, $'}
        showLabel
      />
    </>
  );
};

export default CargoInputs;

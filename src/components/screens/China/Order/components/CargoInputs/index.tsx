import { FC } from 'react';

import { ICargoInfo } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';
import { FancyInput } from '../../../../../ui/Input';

const CargoInputs: FC<{ cargoInfo: ICargoInfo; setCargoInfo: SetState<ICargoInfo> }> = ({
  cargoInfo,
  setCargoInfo
}) => {
  return (
    <>
      <FancyInput
        type={'text'}
        value={cargoInfo.cargo_number}
        handler={(e) => setCargoInfo((prev) => ({ ...prev, cargo_number: e.target.value }))}
        placeholder={'Номер Карго'}
        showLabel
      />
      <FancyInput
        type={'text'}
        value={cargoInfo.cargo_weight}
        handler={(e) => setCargoInfo((prev) => ({ ...prev, cargo_weight: e.target.value }))}
        placeholder={'Вес, КГ'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.packages}
        handler={(e) => setCargoInfo((prev) => ({ ...prev, packages: parseInt(e.target.value) }))}
        placeholder={'Кол-во мешков/коробок'}
        showLabel
      />
      <FancyInput
        type={'text'}
        value={cargoInfo.cargo_volume}
        handler={(e) => setCargoInfo((prev) => ({ ...prev, cargo_volume: e.target.value }))}
        placeholder={'Объем, М3'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.price_per_kg}
        handler={(e) =>
          setCargoInfo((prev) => ({ ...prev, price_per_kg: parseFloat(e.target.value) }))
        }
        placeholder={'Цена за 1кг, $'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.package_price}
        handler={(e) =>
          setCargoInfo((prev) => ({ ...prev, package_price: parseFloat(e.target.value) }))
        }
        placeholder={'Стоимость упаковки, $'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.total_delivery}
        handler={(e) =>
          setCargoInfo((prev) => ({ ...prev, total_delivery: parseFloat(e.target.value) }))
        }
        placeholder={'Общая сумма, $'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.dollar_to_rub}
        handler={(e) =>
          setCargoInfo((prev) => ({ ...prev, dollar_to_rub: parseFloat(e.target.value) }))
        }
        placeholder={'Курс, $ к ₽'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.real_total_delivery}
        handler={(e) =>
          setCargoInfo((prev) => ({ ...prev, real_total_delivery: parseFloat(e.target.value) }))
        }
        placeholder={'Фактическая сумма, $'}
        showLabel
      />
      <FancyInput
        type={'number'}
        value={cargoInfo.delivery_expenses}
        handler={(e) =>
          setCargoInfo((prev) => ({ ...prev, delivery_expenses: parseFloat(e.target.value) }))
        }
        placeholder={'Доп. расходы, $'}
        showLabel
      />
    </>
  );
};

export default CargoInputs;

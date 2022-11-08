import { FC, useState } from 'react';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';

import { FileButton, GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button';
import { FancyInput } from '../../../../../ui/Input';

import Expand from 'react-expand-animated';
import Alert from '@mui/material/Alert';

import { IOrder, IStatus, TStatuses } from '../../../../../../features/order/order.types';

import { convertDateToUSFormat, getDateDiff } from '../../../../../../utils';
import useCargo from '../../hooks/useCargo';
import { CustomDatePicker } from '../../../../../ui/DateTime';
import { SetState } from '../../../../../../utils/types';


const CargoShipInfo: FC<{ order?: IOrder, statuses: IStatus[], setSelectedStatus: SetState<TStatuses> }> = ({
                                                                                                              order,
                                                                                                              statuses,
                                                                                                              setSelectedStatus
                                                                                                            }) => {
  const [open, setOpen] = useState(!!order?.cargo_number);
  const [hasBeenDelivered, setHasBeenDelivered] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const { fromChina, setFromChina, inMoscow, setInMoscow, cargoInfo, setCargoInfo } = useCargo(order, file);
  const updateOrder = useUpdatePartialOrder();

  const lastStatus = statuses.find(status => status.status === 'Заказ в Москве');

  let daysLeftTillInMoscow;

  if (order?.in_moscow_date)
    daysLeftTillInMoscow = getDateDiff(convertDateToUSFormat(order?.in_moscow_date), new Date());

  return (
    <div className='w-full flex justify-between'>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <FileButton
            onChange={e => { e.target.files && setFile(e.target.files[0]); setOpen(true); }}
            customWidth={'w-60'}
            text={'Загрузить файл карго'}
          />
          <GreenButton
            type={'button'}
            text={open ? 'Закрыть' : 'Заполнить вручную'}
            customWidth={'w-60'}
            handler={() => setOpen(!open)}
          />
          <RedButton
            type='button'
            text='Товар уже приехал'
            handler={() => order && updateOrder({
              id: order.id,
              status: lastStatus?.id,
              delivered: true
            }, () => lastStatus && setSelectedStatus(lastStatus.status))}
            customWidth='w-60'
          />
        </div>
        <Expand open={open}>
          <IndigoButton
            type={'button'}
            customWidth={'w-60'}
            text={'Сохранить'}
            handler={() => order && updateOrder({ id: order.id, ...cargoInfo, delivered: false })}
          />
          <div className="h-2"/>
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
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
              type={'text'}
              value={cargoInfo.packages}
              handler={(e) => setCargoInfo(prev => ({ ...prev, packages: parseInt(e.target.value) }))}
              placeholder={'Кол-во грузовых мест'}
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
            <CustomDatePicker
              label={'Отправка из китая'}
              value={fromChina}
              setValue={setFromChina}
            />
            <CustomDatePicker
              label={'Доставка в Москву'}
              value={inMoscow}
              setValue={setInMoscow}
            />
          </div>
        </Expand>
        {order && (
          <>
            {
              daysLeftTillInMoscow && (daysLeftTillInMoscow > 0 || order.delivered) ? (
                  <Alert
                    variant="outlined"
                    severity={daysLeftTillInMoscow >= 5 || order.delivered ? 'success' : 'error'}
                    className='flex items-center'
                  >
                    {order.delivered ?
                      (
                        <p className='text-xl'>
                          Товар уже в Москве
                        </p>
                      )
                      : (
                        <p className='text-xl'>
                          Дней до приезда в
                          Москву: <span className='underline text-indigo-600 text-2xl font-bold'>{daysLeftTillInMoscow}</span>
                        </p>
                      )
                    }
                  </Alert>
                ) :
                (
                  <div className='w-full py-2 flex flex-col space-y-4 px-4 border border-red-500 rounded-md'>
                    <div className="flex items-center space-x-4">
                      <p>
                        Была ли доставка <span className='font-medium'>{order?.in_moscow_date}</span>?
                        <span className='text-sm text-light'>
                          (Нажимая на кнопку "Да" - будет присвоен статус "Заказ В Москве")
                        </span>
                      </p>
                      <IndigoButton
                        type={'button'}
                        text={'Да'}
                        handler={() => order && updateOrder({
                          id: order.id,
                          status: lastStatus?.id,
                          delivered: true
                        }, () => lastStatus && setSelectedStatus(lastStatus.status))}
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
                            in_moscow_date: cargoInfo.in_moscow_date
                          })}
                        />
                      </div>
                    )}
                  </div>
                )
            }
          </>
        )
        }
      </div>
    </div>
  );
};

export default CargoShipInfo;
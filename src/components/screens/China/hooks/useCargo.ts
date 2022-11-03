import { useEffect, useState } from 'react';
import moment from 'moment';
import { convertDateToUSFormat } from '../../../../utils';
import { ICargoInfo, IOrder } from '../../../../features/order/types';

const useCargo = (order: IOrder | undefined) => {
  const [fromChina, setFromChina] = useState(moment(
    order?.shipping_from_china_date ?
      convertDateToUSFormat(order.shipping_from_china_date)
      : null, 'DD/MM/YYYY'
  ));
  const [inMoscow, setInMoscow] = useState(moment(
    order?.in_moscow_date ?
      convertDateToUSFormat(order.in_moscow_date)
      : null, 'DD/MM/YYYY'
  ));

  const [cargoInfo, setCargoInfo] = useState<ICargoInfo>({
    cargo_number: order?.cargo_number ?? '',
    cargo_weight: order?.cargo_weight ?? '',
    cargo_volume: order?.cargo_volume ?? '',
    price_per_kg: order?.price_per_kg ?? 0,
    package_price: order?.package_price ?? 0,
    total_delivery: order?.total_delivery ?? 0,
    shipping_from_china_date: fromChina.format('DD/MM/YYYY'),
    in_moscow_date: inMoscow.format('DD/MM/YYYY')
  });

  useEffect(() => {
    setCargoInfo(prev => ({
      ...prev,
      in_moscow_date: inMoscow.format('DD/MM/YYYY'),
      shipping_from_china_date: fromChina.format('DD/MM/YYYY')
    }));
  }, [fromChina, inMoscow]);

  return { fromChina, setFromChina, inMoscow, setInMoscow, cargoInfo, setCargoInfo };
};

export default useCargo;

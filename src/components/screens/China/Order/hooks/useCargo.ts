import { useEffect, useState } from 'react';
import moment from 'moment';
import { convertDateToUSFormat } from '../../../../../utils';
import { ICargoInfo, IOrder } from '../../../../../features/order/order.types';
import readXlsxFile from 'read-excel-file';

const useCargo = (order: IOrder | undefined, file: File | null) => {
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
  const [realInMoscow, setRealInMoscow] = useState(moment(
    order?.real_in_moscow_date ?
      convertDateToUSFormat(order.real_in_moscow_date)
      : null, 'DD/MM/YYYY'
  ));

  const [cargoInfo, setCargoInfo] = useState<ICargoInfo>({
    cargo_number: order?.cargo_number ?? '',
    cargo_weight: order?.cargo_weight ?? '',
    cargo_volume: order?.cargo_volume ?? '',
    price_per_kg: order?.price_per_kg ?? 0,
    package_price: order?.package_price ?? 0,
    total_delivery: order?.total_delivery ?? 0,
    packages: order?.packages ?? 0,
    shipping_from_china_date: fromChina.format('DD/MM/YYYY'),
    in_moscow_date: inMoscow.format('DD/MM/YYYY'),
    real_in_moscow_date: realInMoscow.format('DD/MM/YYYY')
  });

  useEffect(() => {
    setCargoInfo(prev => ({
      ...prev,
      in_moscow_date: inMoscow.format('DD/MM/YYYY'),
      shipping_from_china_date: fromChina.format('DD/MM/YYYY'),
      real_in_moscow_date: realInMoscow.isValid() ? realInMoscow.format('DD/MM/YYYY') : undefined
    }));
  }, [fromChina, inMoscow, realInMoscow]);

  useEffect(() => {
    if (file)
      readXlsxFile(file).then((rows) => {
        const shipping_from_china_date = new Date(rows[5][3].toString()).toLocaleDateString('us-US');
        const cargo_number = rows[5][8].toString();
        const packages = parseInt(cargo_number.split('-')[1]);
        const cargo_weight = rows[5][13].toString();
        const cargo_volume = rows[5][14].toString();
        const package_price = parseInt(rows[5][22].toString());
        const total_delivery = parseInt(rows[5][23].toString());
        const price_per_kg = parseInt(rows[5][17].toString());

        setFromChina(moment(shipping_from_china_date));

        setCargoInfo(prev => ({
          ...prev,
          price_per_kg,
          cargo_number,
          cargo_volume,
          cargo_weight,
          packages,
          total_delivery,
          package_price
        }))
      });
  }, [file]);

  return { fromChina, setFromChina, inMoscow, setInMoscow, cargoInfo, setCargoInfo, realInMoscow, setRealInMoscow };
};

export default useCargo;

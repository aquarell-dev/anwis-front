import { IOrderForm } from '../../components/screens/China/types';
import { ICreateOrder, IOrder, IOrderRows } from './types';
import { AnyObject } from '../../utils/types';

class OrderService {
  public transformData = (data: IOrderForm): ICreateOrder => {
    const resultData: AnyObject = {};

    Object.entries(data).map(d => {
      const [key, value] = d;

      const intValue = parseInt(value);

      resultData[key] = (isNaN(intValue) || Array.isArray(value)) ? value : intValue;
    });

    console.log(resultData);

    return resultData as ICreateOrder;
  };

  public formRows = (data: IOrder[]): IOrderRows[] => {
    const resultData: IOrderRows[] = data.map(d => ({
      id: d.id,
      individual_entrepreneur: d.individual_entrepreneur.individual_entrepreneur,
      china_distributor: d.china_distributor.china_distributor,
      order_for_project: d.order_for_project.order_for_project,
      status: d.status.status
    }));

    console.log(resultData);

    return resultData;
  };
}

export const orderService = new OrderService();
import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { useListOrdersQuery } from '../../../../store/api/order.api';

import Loader from '../../../ui/Loader';
import Order from '../Order/components/styled/Order';

import { getDateDiff, getFourDigitId } from '../../../../utils';
import { IOrder } from '../../../../features/order/order.types';

type OrderInfo = { label: string; value: string | number | undefined };

const fill = (order: IOrder): OrderInfo[] => [
  {
    label: 'Компания',
    value: order.individual_entrepreneur.individual_entrepreneur
  },
  {
    label: 'Посредник',
    value: order.china_distributor.china_distributor
  },
  {
    label: 'Кол-во товаров',
    value: order.total_quantity
  },
  {
    label: 'Сумма ¥',
    value: order.total_cny
  },
  {
    label: 'Сумма, ₽',
    value: order.total_rub
  },
  {
    label: 'Курс',
    value: order.course
  },
  {
    label: 'Доп Затраты, ₽',
    value: order.total_expenses
  },
  {
    label: 'Дней До Изготовления Товара',
    value: order.ready_date ? getDateDiff(new Date(), new Date(order.ready_date)) > 0 ? getDateDiff(new Date(), new Date(order.ready_date)) : 'Товар Изготовлен ✅' : undefined
  },
  {
    label: 'Номер Карго',
    value: order?.cargo_number
  },
  {
    label: 'Объем, м3',
    value: order?.cargo_volume
  },
  {
    label: 'Общая сумма Доставки, $',
    value: order?.total_delivery
  },
  {
    label: 'Дата Отправки Из Китая',
    value: order.shipping_from_china_date
  },
  {
    label: 'Приблизительная Дата Приезда в Москву',
    value: order.in_moscow_date
  },

];

const Orders: FC = () => {
  const { data, error, isLoading } = useListOrdersQuery(null);

  const navigate = useNavigate();

  if (isLoading) return <Loader isLoading={isLoading}/>;

  if (error) return <p>Error</p>;

  return (
    <div className='mt-8 flex space-x-5'>
      <div
        style={{ height: 600, width: '100%' }}
      >
        <div className="flex items-center space-x-4 mb-3">
          <p className='font-medium text-xl'>Список заказов</p>
          <div className='flex items-center bg-gray-100 px-2 rounded-sm shadow-sm'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type='text'
              className='py-1 bg-gray-100 px-2 outline-none'
              placeholder='Поиск заказов'
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6 mb-4">
          {data?.map(order => (
            <React.Fragment key={order.id}>
              <Order
                border={order.draft ? '#6b7280' : order.status.color}
                hover={order.draft ? '#fff9f9' : order.status.hover_color}
                onClick={() => navigate(`/china/orders/${order.id}`)}
              >
                <div className="flex w-full h-full justify-center">
                  <div className='flex flex-col justify-between h-full w-[40%] border-r-2 border-slate-800'>
                    <div className="flex h-full justify-center items-center flex-col space-y-4">
                      <img
                        src={order.status.photo}
                        alt={'Статус'}
                        className={'h-16 w-16'}
                        style={{ flex: '0 0 auto' }}
                      />
                      <div className="flex items-center w-5/6 justify-center space-x-2 mx-auto">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: order.status.color, flex: '0 0 auto' }}
                        />
                        <p className='text-sm md:text-[16px] font-medium'>{order.status.status}</p>
                      </div>
                    </div>
                    <div className="h-[30%] flex items-center px-3 border-t-2 border-slate-800">
                      <p className='text-sm md:text-[16px]'>Создание: <span className="font-medium">{order.date}</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col text-right">
                    <div className='h-[14%] border-b-2 border-slate-800 px-8 flex items-center justify-between text-xl font-medium'>
                      {order.draft && (<p className=''>Черновик</p>)}
                      <p>Заказ {getFourDigitId(order.id, true)}</p>
                    </div>
                    <div className='flex flex-col mt-1 items-end'>
                      {fill(order).map(field => !!field.value && (
                        <div
                          className='border-b w-fit border-slate-800 py-1 px-4'
                          key={field.label}
                        >
                          <p>
                            <span className='font-medium'>{field.label}</span>: <span style={{ whiteSpace: 'nowrap' }}>{field.value}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Order>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

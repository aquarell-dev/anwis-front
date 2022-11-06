import React, { FC } from 'react';

import { useListOrdersQuery } from '../../../store/api/order.api';
import { useNavigate } from 'react-router-dom';

import Order from './Order/components/styled/Order';
import Loader from '../../ui/Loader';

import { getFourDigitId } from '../../../utils';


const China: FC = () => {

  const { data, error, isLoading } = useListOrdersQuery(null);

  const navigate = useNavigate();

  if (isLoading) return <Loader isLoading={isLoading} />;

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
        <div className="grid grid-cols-3 gap-y-4 gap-x-6">
          {data?.map(order => (
            <React.Fragment key={order.id}>
              <Order
                border={order.status.color}
                hover={order.status.hover_color}
                onClick={() => navigate(`/china/orders/${order.id}`)}
              >
                <div className='flex flex-col space-y-2 w-1/2'>
                  <img
                    src={order.status.photo}
                    alt={'Статус'}
                    className={'h-16 w-16'}
                    style={{ flex: '0 0 auto' }}
                  />
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: order.status.color, flex: '0 0 auto' }} />
                    <p className='text-[12px]'>{order.status.status}</p>
                  </div>
                </div>
                <div className="w-full text-right">
                  <p>
                    Заказ {getFourDigitId(order.id)}
                  </p>
                  <p>ИП: {order.individual_entrepreneur.individual_entrepreneur}</p>
                  <p>КП: {order.china_distributor.china_distributor}</p>
                </div>
              </Order>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default China;

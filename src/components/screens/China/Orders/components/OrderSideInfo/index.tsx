import React, { FC } from 'react'

import { IOrder } from '../../../../../../features/order/order.types'
import { getDateDiff } from '../../../../../../utils'

const OrderSideInfo: FC<IOrder> = order => {
  return (
    <div className='d-none md:flex flex-col justify-between h-full w-[40%] border-r-2 border-slate-800'>
      <div className='flex h-full justify-center items-center flex-col space-y-4'>
        {order?.real_in_moscow_date &&
          getDateDiff(new Date(), new Date(order.real_in_moscow_date)) &&
          !order.acceptance && (
            <p className='text-[12px] text-rose-600 font-medium'>Более 3х дней в Москве</p>
          )}
        <img
          src={order.status.photo}
          alt={'Статус'}
          className={'h-16 w-16'}
          style={{ flex: '0 0 auto' }}
        />
        <div className='flex items-center w-5/6 justify-center space-x-2 mx-auto'>
          <div
            className='h-4 w-4 rounded-full'
            style={{
              backgroundColor: order.status.color,
              flex: '0 0 auto'
            }}
          />
          <p className='text-sm md:text-[16px] font-medium'>{order.status.status}</p>
        </div>
      </div>
      <div className='h-[30%] flex items-center px-3 border-t-2 border-slate-800'>
        <p className='text-sm md:text-[16px]'>
          Создание: <span className='font-medium'>{order.date}</span>
        </p>
      </div>
    </div>
  )
}

export default OrderSideInfo

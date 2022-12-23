import React, { FC } from 'react'

import { IOrder } from '../../../../../../features/order/order.types'
import { getDateDiff } from '../../../../../../utils'

const Navigation: FC<{ orders: IOrder[] | undefined }> = ({ orders }) => {
  let totalOverdue = 0

  orders?.forEach(order => {
    if (!order?.real_in_moscow_date) return

    if (order?.acceptance) return

    if (getDateDiff(new Date(), new Date(order.real_in_moscow_date))) totalOverdue += 1
  })

  return (
    <>
      <div className='flex items-center space-x-4 mb-3'>
        <p className='font-medium text-xl'>Список заказов</p>
        <div className='d-none md:flex items-center bg-gray-100 px-2 rounded-sm shadow-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-gray-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
          <input
            type='text'
            className='py-1 bg-gray-100 px-2 outline-none'
            placeholder='Поиск заказов'
          />
        </div>
      </div>
      {totalOverdue > 0 && (
        <p className='text-rose-600 mb-2'>
          Кол-во заказов в Москве больше 3х дней:{' '}
          <span className='font-medium text-xl text-rose-800'>{totalOverdue}</span>
        </p>
      )}
    </>
  )
}

export default Navigation

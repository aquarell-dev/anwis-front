import React, { FC } from 'react'

import { IOrder } from '../../../../../../features/order/order.types'
import { getFourDigitId } from '../../../../../../utils'
import { fill } from '../../data'

const OrderProperties: FC<IOrder> = order => {
  return (
    <div className='w-full flex flex-col text-right'>
      <div className='h-[14%] border-b-2 border-slate-800 px-8 flex items-center justify-between text-xl font-medium'>
        {order.draft && <p className=''>Черновик</p>}
        <p>Заказ {getFourDigitId(order.id, true)}</p>
      </div>
      <div className='flex flex-col space-y-4 w-full md:d-none'>
        <div className='border-b border-slate-800 py-1 px-4 w-full'>
          <p>{order.status.status}</p>
        </div>
        <div className='border-b border-slate-800 py-1 px-4 w-full'>
          <p>{order.date}</p>
        </div>
      </div>
      <div className='flex flex-col mt-1 items-end'>
        {fill(order).map(
          field =>
            !!field.value && (
              <div
                className='border-b w-fit border-slate-800 py-1 px-4'
                key={field.label}
              >
                <p>
                  <span className='font-medium'>{field.label}</span>:{' '}
                  <span style={{ whiteSpace: 'nowrap' }}>{field.value}</span>
                </p>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default OrderProperties

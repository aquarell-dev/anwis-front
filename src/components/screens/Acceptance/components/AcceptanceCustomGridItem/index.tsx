import React, { ReactNode } from 'react'

import { AcceptanceProductSpecification } from '../../../../../types/acceptance.types'

type CustomGridItemProps = {
  specification: AcceptanceProductSpecification
  children?: ReactNode
}

function AcceptanceCustomGridItem<T extends CustomGridItemProps = CustomGridItemProps>(
  props: T
): JSX.Element {
  const { specification } = props

  return (
    <div className='py-4 border-b border-slate-800 w-full'>
      <p className='font-medium'>{specification.product.title}</p>
      <div className='flex space-x-2 items-center'>
        <img
          src={specification.product.photo}
          alt=''
          className='w-16'
        />
        <div className='flex flex-col space-y-1 text-[16px] w-full h-full'>
          <p>{specification.product.brand}</p>
          <p className=' break-words'>{specification.product.linked_china_product_article}</p>
          <p>{specification.product.size}</p>
        </div>
      </div>
      <div className='h-1 my-3 border-b border-dashed border-slate-800' />
      <p>Отправл. Кол-во: {specification.quantity}</p>
      <p>
        Факт. Кол-во:{' '}
        {specification.actual_quantity === specification.quantity ? (
          <span className='text-emerald-600'>{specification.actual_quantity}</span>
        ) : (
          <span className='text-rose-600'>{specification.actual_quantity}</span>
        )}
      </p>
      {props.children}
    </div>
  )
}

export default AcceptanceCustomGridItem

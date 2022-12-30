import React, { FC } from 'react'

import { FBOShipping } from '../../../../../../types/fbo.types'
import { getFourDigitId } from '../../../../../../utils'

const ShippingNavigation: FC<FBOShipping> = shipping => {
  const getCategories = () =>
    [
      ...new Set(
        shipping.acceptances
          .map(a => a.specifications.map(s => s.product.category?.category))
          .flat()
      )
    ]
      .filter(Boolean)
      .join(', ')

  return (
    <div className='border-b border-slate-800 px-6 pb-4 flex flex-col space-y-2'>
      <div className='flex items-center space-x-8'>
        <h1 className='text-3xl font-medium'>
          Отгрузка ФБО {shipping.acceptances.map(a => getFourDigitId(a.id)).join(', ')}
        </h1>
        <p className='text-xl'>
          <span className='font-medium'>Категории:</span> {getCategories() || '-'}
        </p>
      </div>
      <div className='flex items-center space-x-4 text-xl px-3'>
        <p>
          <span className='font-medium'>ИП:</span>{' '}
          {shipping.acceptances[0]?.individual?.individual_entrepreneur}
        </p>
        <p>
          <span className='font-medium'>Проект:</span> {shipping.acceptances[0]?.project?.project}
        </p>
      </div>
    </div>
  )
}

export default ShippingNavigation

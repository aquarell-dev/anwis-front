import React, { FC } from 'react'

import { useListFboShippingsQuery } from '../../../../store/api/fbo.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import ShippingCard from './components/ShippingCard'

const Shippings: FC = () => {
  const { data, isLoading } = useListFboShippingsQuery(null)

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <h2 className='text-2xl mb-4'>Отгрузки</h2>
      <div className='grid grid-cols-4 gap-x-4 gap-y-8'>
        {data?.map(shipping => (
          <ShippingCard
            {...shipping}
            key={shipping.id}
          />
        ))}
      </div>
    </ContentContainer>
  )
}

export default Shippings

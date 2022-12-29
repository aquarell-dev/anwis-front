import React, { FC } from 'react'

// import { useParams } from 'react-router-dom'
import { useRetrieveFboShippingQuery } from '../../../../store/api/fbo.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import ShippingManagement from './components/ShippingManagement'
import ShippingNavigation from './components/ShippingNavigation'

const Shipping: FC = () => {
  // const { id } = useParams()
  const id = '123'
  const { data: shipping, isLoading } = useRetrieveFboShippingQuery(Number(id))

  if (isLoading || !shipping) return <Loader isLoading />

  return (
    <ContentContainer>
      <ShippingNavigation {...shipping} />
      <ShippingManagement {...shipping} />
    </ContentContainer>
  )
}

export default Shipping

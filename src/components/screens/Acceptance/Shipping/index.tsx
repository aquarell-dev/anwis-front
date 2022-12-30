import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { useRetrieveFboShippingQuery } from '../../../../store/api/fbo.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import ShippingManagement from './components/ShippingManagement'
import ShippingNavigation from './components/ShippingNavigation'

const Shipping: FC = () => {
  const router = useRouter()

  const { id } = router.query

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

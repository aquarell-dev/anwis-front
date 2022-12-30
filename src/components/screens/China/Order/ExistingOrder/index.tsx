import { useRouter } from 'next/router'
import { FC } from 'react'

import { useGetOrderByIdQuery } from '../../../../../store/api/order.api'
import Loader from '../../../../ui/Loader'
import OrderForm from '../components/OrderForm'

const ExistingOrder: FC = () => {
  const router = useRouter()

  const { id } = router.query

  const { data, error, isLoading } = useGetOrderByIdQuery(id as string)

  if (isLoading) return <Loader isLoading={isLoading} />

  if (error) return <p>error...</p>

  if (!id) return <p>error</p>

  return <OrderForm order={data} />
}

export default ExistingOrder

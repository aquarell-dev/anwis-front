import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetAcceptanceByIdQuery } from '../../../../store/api/acceptance.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import AcceptanceNavigation from './components/AcceptanceNavigation'
import AcceptanceProductGrid from './components/AcceptanceProductGrid'
import Management from './components/Management'

const AcceptOrder: FC = () => {
  const { id } = useParams()

  const { data: acceptance, isLoading } = useGetAcceptanceByIdQuery(parseInt(id ? id : '0'))

  if (isLoading) return <Loader isLoading />

  if (!acceptance) return <p>error</p>

  return (
    <ContentContainer>
      <AcceptanceNavigation acceptance={acceptance} />
      <Management acceptance={acceptance} />
      <AcceptanceProductGrid acceptance={acceptance} />
    </ContentContainer>
  )
}

export default AcceptOrder

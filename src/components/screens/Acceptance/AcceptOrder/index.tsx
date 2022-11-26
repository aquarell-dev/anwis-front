import { FC } from 'react'
import { useParams } from 'react-router-dom'

import useUpdateAcceptanceProducts from '../hooks/useUpdateAcceptanceProducts'
import useProducts from './hooks/useProducts'

import AttachDocument from '../../../common/AttachDocument'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import AcceptanceNavigation from './components/AcceptanceNavigation'
import AcceptanceProductGrid from './components/AcceptanceProductGrid'
import AcceptanceTasks from './components/AcceptanceTasks'
import Comment from './components/Comment'
import Management from './components/Management'

const AcceptOrder: FC = () => {
  const { id } = useParams()

  const { selection, acceptance, isLoading, isFetching, ...rest } = useProducts(id)

  const { specifications } = rest

  const { updateFetching, ...mutations } = useUpdateAcceptanceProducts({
    acceptance,
    specifications,
    selection
  })

  if (isLoading) return <Loader isLoading />

  if (!acceptance) return <p>error</p>

  return (
    <ContentContainer>
      <AcceptanceNavigation
        acceptance={acceptance}
        selection={selection}
        specifications={specifications}
      />
      <Management acceptance={acceptance} />
      <div className='w-full h-6 border-t-2 border-slate-600' />
      <AcceptanceProductGrid
        selection={selection}
        loading={isFetching || updateFetching}
        {...mutations}
        {...rest}
      />
      <Comment />
      <AttachDocument documents={[]} />
      <AcceptanceTasks acceptance={acceptance} />
    </ContentContainer>
  )
}

export default AcceptOrder

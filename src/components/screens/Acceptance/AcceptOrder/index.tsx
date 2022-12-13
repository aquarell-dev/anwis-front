import { FC } from 'react'
import { useParams } from 'react-router-dom'

import useUpdateAcceptanceProducts from '../hooks/useUpdateAcceptanceProducts'
import useAcceptance from './hooks/useAcceptance'
import useProducts from './hooks/useProducts'

import AttachDocument from '../../../common/AttachDocument'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import AcceptanceDropdowns from './components/AcceptanceDropdowns'
import AcceptanceNavigation from './components/AcceptanceNavigation'
import AcceptanceProductGrid from './components/AcceptanceProductGrid'
import AcceptanceTasks from './components/AcceptanceTasks'
import Comment from './components/Comment'
import ContorlPanel from './components/ControlPanel'
import Management from './components/Management'
import Reasons from './components/Reasons'
import SpecificationManagement from './components/SpecificationManagment'

const AcceptOrder: FC = () => {
  const { id } = useParams()

  const { selection, acceptance, isLoading, isFetching, ...rest } = useProducts(id)

  const { specifications, setSpecifications } = rest

  const { updateFetching, ...mutations } = useUpdateAcceptanceProducts()

  const { comment, setComment, setDocuments, updateAcceptance, updateLoading, ...acceptanceInfo } =
    useAcceptance(acceptance, specifications)

  if (isLoading || updateLoading) return <Loader isLoading />

  if (!acceptance) return <p>error</p>

  return (
    <ContentContainer>
      <AcceptanceNavigation
        acceptance={acceptance}
        selection={selection}
        specifications={specifications}
      />
      <AcceptanceDropdowns {...acceptanceInfo} />
      <ContorlPanel updateAcceptance={updateAcceptance} />
      <Management acceptance={acceptance} />
      <SpecificationManagement
        specifications={specifications}
        acceptanceId={acceptance.id}
      />
      <AcceptanceProductGrid
        selection={selection}
        loading={isFetching || updateFetching}
        {...mutations}
        {...rest}
      />
      <div className='flex w-full h-[500px] space-x-4 my-6 border-t-2 border-slate-600'>
        <div className='flex flex-col h-full space-y-4 w-1/3 py-6'>
          <Comment
            comment={comment}
            setComment={setComment}
          />
          <AttachDocument
            documents={acceptance.documents}
            setDocuments={setDocuments}
          />
        </div>
        <Reasons
          specifications={specifications}
          setSpecifications={setSpecifications}
          {...mutations}
          loading={isFetching}
        />
      </div>
      <AcceptanceTasks acceptance={acceptance} />
      <ContorlPanel updateAcceptance={updateAcceptance} />
    </ContentContainer>
  )
}

export default AcceptOrder

import { useRouter } from 'next/router'
import { FC } from 'react'

import useUpdateAcceptanceProducts from '../hooks/useUpdateAcceptanceProducts'
import useAcceptance from './hooks/useAcceptance'
import useProducts from './hooks/useProducts'

import AttachDocument from '../../../common/AttachDocument'
import { IndigoButton } from '../../../ui/Button'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import AcceptanceCustomGrid from './components/AcceptanceCustomGrid'
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
  const router = useRouter()

  const { id } = router.query

  const { selection, acceptance, isLoading, isFetching, ...rest } = useProducts(id as string)

  const { specifications, setSpecifications } = rest

  const { updateFetching, ...mutations } = useUpdateAcceptanceProducts()

  const { comment, setComment, setDocuments, updateAcceptance, updateLoading, ...acceptanceInfo } =
    useAcceptance(acceptance, specifications)

  if (isLoading || updateLoading) return <Loader isLoading />

  if (!acceptance) return <p>error</p>

  return (
    <ContentContainer>
      <div className='absolute left-0 top-0 m-2'>
        <IndigoButton
          type='button'
          handler={() => router.push('../tsd/acceptances')}
          customWidth='w-12 block md:d-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
            />
          </svg>
        </IndigoButton>
      </div>
      <AcceptanceNavigation
        acceptance={acceptance}
        selection={selection}
        specifications={specifications}
      />
      <AcceptanceDropdowns {...acceptanceInfo} />
      <div className='d-none lg:block'>
        <ContorlPanel updateAcceptance={updateAcceptance} />
      </div>
      <Management acceptance={acceptance} />
      <SpecificationManagement
        specifications={specifications}
        acceptanceId={acceptance.id}
      />
      <div className='d-none md:block w-full'>
        <AcceptanceProductGrid
          selection={selection}
          loading={isFetching || updateFetching}
          {...mutations}
          {...rest}
        />
      </div>
      <div className='block md:d-none w-full'>
        <AcceptanceCustomGrid
          loading={isFetching || updateFetching}
          {...rest}
          {...mutations}
        />
      </div>
      <div className='d-none lg:flex w-full h-[500px] space-x-4 my-6 border-t-2 border-slate-600'>
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

import { FC } from 'react'

import useNotifications from '../../../hooks/useNotifications'
import useAdditional from './hooks/useAdditional'

import {
  useCreateChinaDistributorMutation,
  useDeleteChinaDistributorMutation,
  useUpdateChinaDistributorMutation
} from '../../../store/api/distributor.api'
import {
  useCreateOrderForProjectMutation,
  useDeleteOrderForProjectMutation,
  useUpdateOrderForProjectMutation
} from '../../../store/api/project.api'
import { ContentContainer } from '../../ui/Container'
import Loader from '../../ui/Loader'
import CRUDContainer from './components/CRUDContainer'
import CRUDContent from './components/CRUDContent'
import Distributor from './components/Distributor'
import Payment from './components/Payment'
import Project from './components/Project'

const Additional: FC = () => {
  const additional = useAdditional()

  const { isLoading, error } = additional

  if (isLoading) return <Loader isLoading={true} />

  if (error) return <p>error...</p>

  return (
    <ContentContainer>
      <div className='w-full grid grid-cols-4 place-items-center'>
        <Distributor additional={additional} />
        <Project additional={additional} />
        <Payment />
      </div>
    </ContentContainer>
  )
}

export default Additional

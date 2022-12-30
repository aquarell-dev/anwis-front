import React, { FC, useState } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import useAcceptances from '../Acceptances/hooks/useAcceptances'

import { ListAcceptance } from '../../../../types/acceptance.types'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import MiniAcceptance from './components/MiniAcceptance'
import ShippingDrop from './components/ShippingDrop'

const Fbo: FC = () => {
  const { acceptances, isLoading, isFetching } = useAcceptances()

  const [currentDragAcceptance, setCurrentDragAcceptance] = useState<ListAcceptance | null>(null)

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <div className='grid grid-cols-3 gap-x-4 gap-y-8'>
        {isFetching && (
          <SpinnerComponent
            loading
            position='centered'
            backgroundColor='grey'
          />
        )}
        {acceptances
          ?.filter(acceptance => acceptance.status.status === 'Упаковано')
          .map(acceptance => (
            <MiniAcceptance
              acceptance={acceptance}
              dragStart={e => setCurrentDragAcceptance(prev => acceptance)} // so state updates immediately
              draggable
              key={acceptance.id}
            />
          ))}
      </div>
      <div className='h-1 border-t-2 border-slate-800 my-10' />
      <ShippingDrop currentDragAcceptance={currentDragAcceptance} />
      <div className='h-1 border-t-2 border-slate-800 my-4' />
    </ContentContainer>
  )
}

export default Fbo

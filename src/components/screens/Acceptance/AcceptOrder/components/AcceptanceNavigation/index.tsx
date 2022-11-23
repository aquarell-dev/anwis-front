import { FC } from 'react'

import { GridSelectionModel } from '@mui/x-data-grid'

import { Acceptance } from '../../../../../../types/acceptance.types'
import { GreenButton, IndigoButton } from '../../../../../ui/Button'

const AcceptanceNavigation: FC<{
  acceptance: Acceptance
  selection: GridSelectionModel
}> = ({ acceptance, selection }) => {
  return (
    <div className='flex flex-col space-y-2 border-b border-slate-600 py-2 px-4'>
      <div className='flex items-center space-x-4'>
        <h1 className='text-2xl font-medium'>{acceptance.title}</h1>
        <p>
          Дата Создания: <span className='font-medium'>{acceptance.created_at}</span>
        </p>
        <IndigoButton
          type='button'
          text={`Печать этикеток(${selection.length || 'Все'})`}
          customWidth='w-80'
          handler={() => {}}
        />
        <GreenButton
          type='button'
          text='Печать ПДФ'
          customWidth='w-80'
          handler={() => {}}
        />
      </div>
      <p>
        <span className='font-medium'>Категории</span>:{' '}
        {[
          ...new Set(
            acceptance.products.map(specification => specification.product.category).filter(Boolean)
          )
        ].join(', ')}
      </p>
    </div>
  )
}

export default AcceptanceNavigation

import { FC, useState } from 'react'

import { GridSelectionModel } from '@mui/x-data-grid'

import {
  Acceptance,
  AcceptanceProductSpecification
} from '../../../../../../types/acceptance.types'
import { getFourDigitId } from '../../../../../../utils'
import { GreenButton, IndigoButton } from '../../../../../ui/Button'
import Labels from '../Labels'

const AcceptanceNavigation: FC<{
  acceptance: Acceptance
  selection: GridSelectionModel
  specifications: AcceptanceProductSpecification[]
}> = ({ acceptance, selection, specifications }) => {
  const [labelsOpen, setLabelsOpen] = useState(false)

  let packed = 0
  let total = 0

  acceptance.specifications.forEach(s =>
    s.boxes.forEach(box => {
      if (box.finished) {
        packed += box.quantity
      }
      total += box.quantity
    })
  )

  return (
    <>
      <Labels
        acceptance={acceptance}
        labelsOpen={labelsOpen}
        specifications={specifications}
        setLabelsOpen={setLabelsOpen}
      />
      <div className='flex flex-col space-y-2 py-2 px-4'>
        <div className='flex items-center space-x-4'>
          <h1 className='text-2xl font-medium'>
            {acceptance.title || `Приемка ${getFourDigitId(acceptance.id)}`}
          </h1>
          <p>
            Дата Создания: <span className='font-medium'>{acceptance.created_at}</span>
          </p>
          <IndigoButton
            type='button'
            text={`Печать этикеток(${selection.length || 'Все'})`}
            customWidth='w-80'
            handler={() => setLabelsOpen(true)}
          />
          <GreenButton
            type='button'
            text='Печать ПДФ'
            customWidth='w-80'
            handler={() => {}}
          />
        </div>
        <div className='flex space-x-4 items-center'>
          {acceptance.specifications.length > 0 && (
            <p>
              <span className='font-medium'>Категории</span>:{' '}
              {[
                ...new Set(
                  acceptance.specifications
                    .map(specification => specification.product.category?.category)
                    .filter(Boolean)
                )
              ].join(', ')}
            </p>
          )}
          {acceptance?.project && (
            <p>
              <span className='font-medium'>Проект</span>: {acceptance.project.project}
            </p>
          )}
          {acceptance?.individual && (
            <p>
              <span className='font-medium'>ИП</span>:{' '}
              {acceptance.individual.individual_entrepreneur}
            </p>
          )}
          {acceptance.status.status === 'Упаковывается' && (
            <p>
              Упаковано: {packed}/{total} шт
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default AcceptanceNavigation

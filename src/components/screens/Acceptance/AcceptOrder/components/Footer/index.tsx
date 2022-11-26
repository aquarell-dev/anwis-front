import { FC } from 'react'

import { GridFooter, GridFooterContainer } from '@mui/x-data-grid'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { cn } from '../../../../../../utils'

const Footer: FC<{ specifications: AcceptanceProductSpecification[] }> = ({ specifications }) => {
  let difference = 0
  let actual = 0

  specifications.forEach(specification => {
    if (specification.actual_quantity) {
      difference += specification.actual_quantity - specification.quantity
      actual += specification.actual_quantity ?? 0
    }
  })

  const resultAcceptance = specifications.reduce(
    (prev, curr) => ({
      ...curr,
      quantity: prev.quantity + curr.quantity,
      cost: prev.cost + curr.cost
    }),
    { cost: 0, actual_quantity: 0, quantity: 0 } as AcceptanceProductSpecification
  )

  return (
    <GridFooterContainer>
      <div className='mx-4 flex items-center space-x-6 select-none'>
        <p>
          Общая Себестоимость:{' '}
          <span className='font-medium text-[16px] underline'>{resultAcceptance.cost}, ₽</span>
        </p>
        <p>
          Отправл. Кол-во:{' '}
          <span className='font-medium text-[16px] underline'>{resultAcceptance.quantity}</span>
        </p>
        <p>
          Факт. Кол-во: <span className='font-medium text-[16px] underline'>{actual}</span>
        </p>
        <p>
          Расхождение:{' '}
          <span
            className={cn(
              'font-medium text-[16px] underline',
              difference >= 0 ? 'text-emerald-600' : 'text-rose-700'
            )}
          >
            {difference} шт.
          </span>
        </p>
      </div>
      <GridFooter
        sx={{
          border: 'none' // To delete double border.
        }}
      />
    </GridFooterContainer>
  )
}

export default Footer

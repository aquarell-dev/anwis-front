import { FC } from 'react'

import '../../../../../../index.css'
import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { IndigoButton } from '../../../../../ui/Button'
import BoxInput from '../BoxInput'

const BoxItem: FC<
  AcceptanceProductSpecification & {
    addBox: (id: number) => Promise<void>
    validateBeforeSave: (specification: AcceptanceProductSpecification) => boolean | void
    formatBoxes: (
      specification: AcceptanceProductSpecification,
      setSpecifications: SetState<AcceptanceProductSpecification[]>
    ) => void
    setSpecifications: SetState<AcceptanceProductSpecification[]>
    onDetailedUpdate: (id: number) => Promise<void>
  }
> = props => {
  const {
    addBox,
    validateBeforeSave,
    formatBoxes,
    setSpecifications,
    onDetailedUpdate,
    ...specification
  } = props

  return (
    <>
      <div className='flex items-center space-x-2 py-2 px-4 border-b border-slate-800 children__no_shrink'>
        <p
          tabIndex={-1}
          className='border-r border-slate-800 pr-2 w-52 text-ellipsis whitespace-nowrap overflow-x-hidden'
        >
          {specification.product.title}
        </p>
        <img
          tabIndex={-1}
          src={specification.product.photo}
          alt={specification.product.title}
          className='w-10 border-r border-slate-800 pr-2'
        />
        <p
          tabIndex={-1}
          className='border-r border-slate-800 pr-2 w-52 text-ellipsis whitespace-nowrap overflow-x-hidden'
        >
          {specification.product.linked_china_product_article ?? '-'}
        </p>
        <p
          tabIndex={-1}
          className='border-r border-slate-800 pr-2 w-20 text-ellipsis whitespace-nowrap overflow-x-hidden'
        >
          {specification.product.size}
        </p>
        <p
          tabIndex={-1}
          className='border-r border-slate-800 pr-2 w-24 text-ellipsis whitespace-nowrap overflow-x-hidden'
        >
          {specification.actual_quantity}
        </p>
        {specification.boxes.map((box, idx) => (
          <BoxInput
            specification={specification}
            setSpecifications={setSpecifications}
            box={box}
            key={idx}
          />
        ))}
        <IndigoButton
          type='button'
          handler={async () => {
            await addBox(specification.id)
          }}
          disabled={specification.boxes.length >= 3}
          text={'Добавить Коробку'}
          customWidth='w-48'
          tabindex={-1}
        />
        <IndigoButton
          type='button'
          handler={async () => {
            const pass = validateBeforeSave(specification)
            if (pass) await onDetailedUpdate(specification.product.id)
          }}
          tabindex={-1}
          customWidth='w-12'
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
              d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
            />
          </svg>
        </IndigoButton>
      </div>
    </>
  )
}

export default BoxItem

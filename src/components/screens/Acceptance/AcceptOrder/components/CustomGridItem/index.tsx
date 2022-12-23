import { forwardRef, useEffect } from 'react'

import { UpdateSpecification } from '../../../hooks/useUpdateAcceptanceProducts'
import useBoxFocus from '../../hooks/useBoxFocus'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton } from '../../../../../ui/Button'
import BoxInput from '../BoxInput'

type CustomGridItemProps = {
  specification: AcceptanceProductSpecification
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  updateSpecification: UpdateSpecification
  addBox: (id: number) => Promise<AcceptanceProductSpecification | undefined>
  validateBeforeSave: (specification: AcceptanceProductSpecification) => boolean
  boxLoading: boolean
  boxesFetching: boolean
  lastAddedBox: AcceptanceProductSpecification | undefined
}

const CustomGridItem = forwardRef<HTMLInputElement, CustomGridItemProps>((props, ref) => {
  const { specification, setSpecifications, addBox, boxLoading } = props

  useBoxFocus()

  return (
    <div
      key={specification.product.id}
      className='py-4 border-b border-slate-800 w-full'
    >
      <p className='font-medium'>{specification.product.title}</p>
      <div className='flex space-x-2 items-center'>
        <img
          src={specification.product.photo}
          alt=''
          className='w-16'
        />
        <div className='flex flex-col space-y-1 text-[16px] w-full h-full'>
          <p>{specification.product.brand}</p>
          <p className=' break-words'>{specification.product.linked_china_product_article}</p>
          <p>{specification.product.size}</p>
        </div>
      </div>
      <div className='h-1 my-3 border-b border-dashed border-slate-800' />
      <p>Отправл. Кол-во: {specification.quantity}</p>
      <p>
        Факт. Кол-во:{' '}
        {specification.actual_quantity === specification.quantity ? (
          <span className='text-emerald-600'>{specification.actual_quantity}</span>
        ) : (
          <span className='text-rose-600'>{specification.actual_quantity}</span>
        )}
      </p>
      <div className='flex flex-col w-full space-y-2 my-2'>
        {specification.boxes.map((box, idx) => (
          <BoxInput
            box={box}
            specification={specification}
            setSpecifications={setSpecifications}
            key={box.id}
            idx={idx}
            ref={ref}
          />
        ))}
      </div>
      <div className='flex flex-col space-y-2 my-2 w-full'>
        <GreenButton
          type='button'
          handler={async () => await addBox(specification.id)}
          text='Добавить Коробку'
          customWidth='w-full'
          tabindex={-1}
          loading={boxLoading}
        />
      </div>
    </div>
  )
})

export default CustomGridItem

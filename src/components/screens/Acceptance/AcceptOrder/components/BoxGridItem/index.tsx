import { forwardRef, useEffect } from 'react'

import { UpdateSpecification } from '../../../hooks/useUpdateAcceptanceProducts'
import useBoxFocus from '../../hooks/useBoxFocus'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton } from '../../../../../ui/Button'
import AcceptanceCustomGridItem from '../../../components/AcceptanceCustomGridItem'
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

const BoxGridItem = forwardRef<HTMLInputElement, CustomGridItemProps>((props, ref) => {
  const { specification, setSpecifications, addBox, boxLoading } = props

  useBoxFocus()

  return (
    <AcceptanceCustomGridItem specification={specification}>
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
    </AcceptanceCustomGridItem>
  )
})

export default BoxGridItem

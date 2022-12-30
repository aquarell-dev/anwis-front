import React, { FC, forwardRef, useState } from 'react'

import {
  AcceptanceProductSpecification,
  ListAcceptance
} from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'
import AcceptanceCustomGridItem from '../../../components/AcceptanceCustomGridItem'

type QuantityGridItemProps = {
  acceptanceId: number
  specification: AcceptanceProductSpecification
  setSubmittedAcceptances: SetState<ListAcceptance[]>
}

const QuantityGridItem = forwardRef<HTMLInputElement, QuantityGridItemProps>((props, ref) => {
  const { specification, setSubmittedAcceptances, acceptanceId } = props

  const [quantity, setQuantity] = useState(String(specification.fbo_quantity))

  const patchFboQuantity = (value: string) => {
    setSubmittedAcceptances(prev =>
      prev.map(acceptance =>
        acceptance.id === acceptanceId
          ? {
              ...acceptance,
              specifications: acceptance.specifications.map(s =>
                s.id === specification.id ? { ...s, fbo_quantity: Number(value) } : s
              )
            }
          : acceptance
      )
    )
  }

  return (
    <AcceptanceCustomGridItem specification={specification}>
      <p>{specification.boxes.map(box => `${box.box}(${box.quantity})`).join(', ')}</p>
      <div className='my-2'>
        <FancyInput
          value={quantity}
          handler={e => {
            if (isNaN(Number(e.target.value))) return
            patchFboQuantity(e.target.value)
            setQuantity(e.target.value)
          }}
          placeholder='Отправл. Кол-во'
          showLabel
          customWidth='w-full'
          ref={ref}
        />
      </div>
    </AcceptanceCustomGridItem>
  )
})

export default QuantityGridItem

import { ChangeEvent } from 'react'

import { AcceptanceProductSpecification, Box } from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'

const useEditBoxes = (
  specification: AcceptanceProductSpecification,
  setSpecifications: SetState<AcceptanceProductSpecification[]>,
  box: Box
) => {
  const changeBoxes = (getBoxes: (s: AcceptanceProductSpecification, boxId: number) => Box[]) => {
    const { id } = box

    setSpecifications(prev =>
      prev.map(s =>
        s.id === specification.id
          ? {
              ...s,
              boxes: getBoxes(s, id)
            }
          : s
      )
    )
  }

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    changeBoxes((s, boxId) =>
      s.boxes.map(box => (box.id === boxId ? { ...box, quantity: Number(value) } : box))
    )
  }

  const handleChangeBox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    changeBoxes((s, boxId) => s.boxes.map(box => (box.id === boxId ? { ...box, box: value } : box)))
  }

  return { handleChangeQuantity, handleChangeBox }
}

export default useEditBoxes

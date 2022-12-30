import { ChangeEvent } from 'react'

import { AcceptanceProductSpecification, Reason } from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'

const useEditReasons = (
  specification: AcceptanceProductSpecification,
  setSpecifications: SetState<AcceptanceProductSpecification[]>,
  reason: Reason
) => {
  const changeReasons = (
    getReasons: (s: AcceptanceProductSpecification, reasonId: number) => Reason[]
  ) => {
    const { id } = reason

    setSpecifications(prev =>
      prev.map(s =>
        s.id === specification.id
          ? {
              ...s,
              reasons: getReasons(s, id)
            }
          : s
      )
    )
  }

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    changeReasons((s, reasonId) =>
      s.reasons.map(reason =>
        reason.id === reasonId ? { ...reason, quantity: Number(value) } : reason
      )
    )
  }

  const handleChangeReason = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    changeReasons((s, reasonId) =>
      s.reasons.map(reason => (reason.id === reasonId ? { ...reason, reason: value } : reason))
    )
  }

  return { handleChangeQuantity, handleChangeReason }
}

export default useEditReasons

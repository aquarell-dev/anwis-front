import { useState } from 'react'

import { ListAcceptance } from '../../../../../types/acceptance.types'

const useFboAcceptances = () => {
  const [submittedAcceptances, setSubmittedAcceptances] = useState<ListAcceptance[]>([])
  const [open, setOpen] = useState(false)

  console.log(submittedAcceptances)

  const drop = (currentDragAcceptance: ListAcceptance | null) => {
    if (
      currentDragAcceptance &&
      !submittedAcceptances.map(a => a.id).includes(currentDragAcceptance.id)
    ) {
      setSubmittedAcceptances(prev => [
        ...prev,
        {
          ...currentDragAcceptance,
          specifications: currentDragAcceptance.specifications.map(specification => ({
            ...specification,
            fbo_quantity: specification.actual_quantity
          }))
        }
      ])
      setOpen(true)
    }
  }

  return { setSubmittedAcceptances, submittedAcceptances, drop, open, setOpen }
}

export default useFboAcceptances

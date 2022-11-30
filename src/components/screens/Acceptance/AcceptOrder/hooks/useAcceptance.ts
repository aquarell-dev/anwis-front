import { useEffect, useState } from 'react'

import useUpdatePartialAcceptance from '../../hooks/useUpdatePartialAcceptance'

import { useListAcceptanceStatusesQuery } from '../../../../../store/api/acceptance.status.api'
import {
  Acceptance,
  AcceptanceProductSpecification,
  AcceptanceStatus
} from '../../../../../types/acceptance.types'

const useAcceptance = (
  acceptance: Acceptance | undefined,
  specifications: AcceptanceProductSpecification[]
) => {
  const { updatePartialAcceptance, updateLoading } = useUpdatePartialAcceptance()
  const { data: statuses, isLoading: statusesLoading } = useListAcceptanceStatusesQuery(null)

  const [comment, setComment] = useState(acceptance?.comment ?? '')
  const [documents, setDocuments] = useState<number[]>([])
  const [currentStatus, setCurrentStatus] = useState({} as AcceptanceStatus)

  useEffect(() => {
    if (acceptance) setCurrentStatus(acceptance.status)
  }, [acceptance])

  const updateAcceptance = async () => {
    if (!acceptance) return

    await updatePartialAcceptance({
      specifications: specifications.map(s => ({ ...s, product: s.product.id })),
      id: acceptance.id,
      documents,
      comment,
      status: currentStatus.id
    })
  }

  return {
    comment,
    setComment,
    setDocuments,
    updateAcceptance,
    updateLoading,
    statuses,
    statusesLoading,
    currentStatus,
    setCurrentStatus
  }
}

export default useAcceptance

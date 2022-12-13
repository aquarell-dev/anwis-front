import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useUpdatePartialAcceptance from '../../hooks/useUpdatePartialAcceptance'

import moment, { Moment } from 'moment'

import { IIndividual, IProject } from '../../../../../features/order/order.types'
import { useListAcceptanceStatusesQuery } from '../../../../../store/api/acceptance.status.api'
import { useListIndividualEntrepreneursQuery } from '../../../../../store/api/individual.api'
import { useListOrderForProjectsQuery } from '../../../../../store/api/project.api'
import {
  Acceptance,
  AcceptanceProductSpecification,
  AcceptanceStatus
} from '../../../../../types/acceptance.types'

export type AcceptanceInfo = Partial<{
  // todo come up with a better name
  currentStatus: AcceptanceStatus
  currentIndividual: IIndividual
  currentProject: IProject
  createdAt: Moment
}>

const useAcceptance = (
  acceptance: Acceptance | undefined,
  specifications: AcceptanceProductSpecification[]
) => {
  const { updatePartialAcceptance, updateLoading } = useUpdatePartialAcceptance()
  const { data: statuses, isLoading: statusesLoading } = useListAcceptanceStatusesQuery(null)
  const { data: projects, isLoading: projectsLoading } = useListOrderForProjectsQuery(null)
  const { data: individuals, isLoading: individualsLoading } =
    useListIndividualEntrepreneursQuery(null)

  const { notifyError } = useNotifications()

  const [comment, setComment] = useState(acceptance?.comment ?? '')
  const [documents, setDocuments] = useState<number[]>([])
  const [acceptanceInfo, setAcceptanceInfo] = useState<AcceptanceInfo>({} as AcceptanceInfo)

  useEffect(() => {
    if (acceptance) {
      setAcceptanceInfo({
        currentStatus: acceptance.status,
        currentIndividual: acceptance.individual,
        currentProject: acceptance.project,
        createdAt: moment(acceptance.created_at, 'HH:mm DD/MM/YYYY')
      })
    }
  }, [acceptance])

  const updateAcceptance = async () => {
    if (!acceptance) return

    await updatePartialAcceptance({
      specifications: specifications.map(s => ({ ...s, product: s.product.id })),
      id: acceptance.id,
      documents,
      comment,
      status: acceptanceInfo.currentStatus?.status,
      individual: acceptanceInfo.currentIndividual?.id,
      project: acceptanceInfo.currentProject?.id,
      created_at: acceptanceInfo.createdAt?.format('YYYY-MM-DDTHH:mm')
    })
  }

  return {
    comment,
    setComment,
    setDocuments,
    updateAcceptance,
    updateLoading,
    statuses,
    projects,
    individuals,
    acceptanceInfo,
    setAcceptanceInfo
  }
}

export default useAcceptance

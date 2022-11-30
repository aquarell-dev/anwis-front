import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useNotifications from '../../../../../hooks/useNotifications'

import { useCreateAcceptanceMutation } from '../../../../../store/api/acceptance.api'
import { CreateAcceptance } from '../../../../../types/acceptance.types'
import { AcceptanceFields } from '../../types'

export type NavigationAfter = {
  navigateToAcceptance?: boolean
  customUrl?: string
}

const useCreateAcceptance = () => {
  const [create, { data, isLoading }] = useCreateAcceptanceMutation()

  const [acceptanceFields, setAcceptanceFields] = useState({} as AcceptanceFields)

  const { notifyError, notifySuccess } = useNotifications()

  const navigate = useNavigate()

  const createAcceptance = async (
    acceptance: CreateAcceptance,
    navigationAfter?: NavigationAfter
  ) => {
    try {
      await create(acceptance).unwrap()
      notifySuccess('Приемка создана')
      if (navigationAfter)
        (navigationAfter.navigateToAcceptance || navigationAfter.customUrl) &&
        navigationAfter.navigateToAcceptance
          ? navigate(`../acceptances/${data?.id.toString()}` ?? '')
          : navigate(navigationAfter.customUrl ?? '')
    } catch {
      notifyError('Приемка не создана')
    }
  }

  return { createAcceptance, isLoading, acceptanceFields, setAcceptanceFields }
}

export default useCreateAcceptance

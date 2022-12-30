import { useRouter } from 'next/router'
import { useState } from 'react'

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

  const router = useRouter()

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
          ? router.push(`../acceptances/${data?.id.toString()}` ?? '')
          : router.push(navigationAfter.customUrl ?? '')
    } catch (e) {
      notifyError('Приемка не создана')
    }
  }

  return { createAcceptance, isLoading, acceptanceFields, setAcceptanceFields }
}

export default useCreateAcceptance

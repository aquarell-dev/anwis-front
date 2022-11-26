import useNotifications from '../../../../hooks/useNotifications'

import { useUpdatePartialAcceptanceMutation } from '../../../../store/api/acceptance.api'
import { PartialUpdateAcceptance } from '../../../../types/acceptance.types'

const useUpdatePartialAcceptance = () => {
  const [update, { isLoading }] = useUpdatePartialAcceptanceMutation()
  const { notifyError, notifySuccess } = useNotifications()

  const updatePartialAcceptance = async (acceptance: PartialUpdateAcceptance) => {
    try {
      await update(acceptance)
      notifySuccess('Приемка была обновлена')
    } catch {
      notifyError('Приемка не была обновлена')
    }
  }

  return { updatePartialAcceptance, updateLoading: isLoading }
}

export default useUpdatePartialAcceptance

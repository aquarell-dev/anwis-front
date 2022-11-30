import useNotifications from '../../../../../hooks/useNotifications'

import { useDeleteReasonMutation } from '../../../../../store/api/acceptance.reason'
import { useAddReasonMutation } from '../../../../../store/api/acceptance.specification.api'

const useReasons = () => {
  const [add, { isLoading: addLoading }] = useAddReasonMutation()
  const [delete_, { isLoading: deleteLoading }] = useDeleteReasonMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const addReason = async (id: number) => {
    try {
      await add({ id }).unwrap()
    } catch {
      notifyError('Причина не была создана')
    }
  }

  const deleteReason = async (id: number) => {
    try {
      await delete_({ id }).unwrap()
    } catch {
      notifyError('Причина не была создана')
    }
  }

  return { addReason, deleteReason, isLoading: deleteLoading || addLoading }
}

export default useReasons

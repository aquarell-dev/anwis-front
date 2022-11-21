import useNotifications from '../../../../../hooks/useNotifications'

import { useDeleteRussianProductMutation } from '../../../../../store/api/acceptance.product.api'

const useDeleteMultipleProducts = () => {
  const [delete_, { isLoading }] = useDeleteRussianProductMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const deleteMultipleProducts = async (ids: number[]) => {
    const deletion = ids.map(id => delete_({ id }).unwrap())

    try {
      await Promise.all(deletion)
      notifySuccess('Товары были удалены')
    } catch (e) {
      notifyError('Товары не были удалены')
    }
  }

  return { deleteMultipleProducts, isLoading }
}

export default useDeleteMultipleProducts

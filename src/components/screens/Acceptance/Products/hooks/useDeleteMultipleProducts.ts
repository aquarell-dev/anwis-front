import useNotifications from '../../../../../hooks/useNotifications'

import { useDeleteMultipleProductsMutation } from '../../../../../store/api/acceptance.product.api'

const useDeleteMultipleProducts = () => {
  const [delete_, { isLoading }] = useDeleteMultipleProductsMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const deleteMultipleProducts = async (ids: number[]) => {
    try {
      await delete_({ products: ids }).unwrap()
      notifySuccess('Товары были удалены')
    } catch (e) {
      notifyError('Товары не были удалены')
    }
  }

  return { deleteMultipleProducts, isLoading }
}

export default useDeleteMultipleProducts

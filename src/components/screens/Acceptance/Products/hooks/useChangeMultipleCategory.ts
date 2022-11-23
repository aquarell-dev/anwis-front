import useNotifications from '../../../../../hooks/useNotifications'

import { useUpdateMultipleCategoriesMutation } from '../../../../../store/api/acceptance.product.api'

const useChangeMultipleCategory = () => {
  const [updateMultiple, { isLoading }] = useUpdateMultipleCategoriesMutation()
  const { notifyError, notifySuccess } = useNotifications()

  const updateMultipleCategories = async (data: { products: number[]; category: number }) => {
    try {
      await updateMultiple(data).unwrap()
      notifySuccess('Категории были обновлены')
    } catch (e) {
      notifyError('Категории не были обновлены')
    }
  }

  return { updateMultipleCategories, updateMultipleLoading: isLoading }
}

export default useChangeMultipleCategory

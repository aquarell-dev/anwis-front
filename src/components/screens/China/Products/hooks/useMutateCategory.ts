import useNotifications from '../../../../../hooks/useNotifications'

import { ICategory } from '../../../../../features/order/order.types'
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from '../../../../../store/api/category.api'

const useMutateCategory = () => {
  const [updateCategory, updateResult] = useUpdateCategoryMutation()
  const [deleteCategory, deleteResult] = useDeleteCategoryMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const update = (category: ICategory, onFulfil: () => void) =>
    updateCategory(category)
      .unwrap()
      .then(() => notifySuccess('Категория была обновлена'))
      .catch(() => notifyError('Категория не была обновлена'))
      .finally(() => onFulfil())

  const deleteCat = (category: ICategory, onFulfil: () => void) =>
    deleteCategory(category.id)
      .unwrap()
      .then(() => notifySuccess('Категория была удалена'))
      .catch(() => notifyError('Категория не была удалена'))
      .finally(() => onFulfil())

  return [update, deleteCat]
}

export default useMutateCategory

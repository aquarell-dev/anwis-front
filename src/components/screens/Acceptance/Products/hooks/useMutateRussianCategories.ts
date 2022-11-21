import useNotifications from '../../../../../hooks/useNotifications'

import {
  useDeleteRussianCategoryMutation,
  useUpdateRussianCategoryMutation
} from '../../../../../store/api/acceptance.category.api'
import { AcceptanceCategory } from '../../../../../types/acceptance.types'

const useMutateRussianCategories = () => {
  const [delete_, deleteResult] = useDeleteRussianCategoryMutation()
  const [update, updareResult] = useUpdateRussianCategoryMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const updateCategory = (category: AcceptanceCategory, onFulfil: () => void) =>
    update(category)
      .unwrap()
      .then(() => notifySuccess('Категория создана'))
      .catch(() => notifyError('Категория не обновлена'))
      .finally(() => onFulfil())

  const deleteCategory = (category: AcceptanceCategory, onFulfil: () => void) =>
    delete_(category)
      .unwrap()
      .then(() => notifySuccess('Категория удалена'))
      .catch(() => notifyError('Категория не удалена'))
      .finally(() => onFulfil())

  return [updateCategory, deleteCategory]
}

export default useMutateRussianCategories

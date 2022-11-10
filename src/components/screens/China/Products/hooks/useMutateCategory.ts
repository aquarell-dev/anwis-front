import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../../../../store/api/category.api';
import { ICategory } from '../../../../../features/order/order.types';
import useNotifications from '../../../../../hooks/useNotifications';

const useMutateCategory = () => {
  const [updateCategory, updateResult] = useUpdateCategoryMutation();
  const [deleteCategory, deleteResult] = useDeleteCategoryMutation();

  const { notifyError, notifySuccess } = useNotifications();

  const update = (category: ICategory, onFulfil: () => void) => updateCategory(category)
    .unwrap()
    .then(() => { notifySuccess('Категория была обновлена'); onFulfil(); })
    .catch(() => { notifyError('Категория не была обновлена'); onFulfil(); });

  const deleteCat = (category: ICategory, onFulfil: () => void) => deleteCategory(category.id)
    .unwrap()
    .then(() => { notifySuccess('Категория была удалена'); onFulfil(); })
    .catch(() => { notifyError('Категория не была удалена'); onFulfil(); });

  return [update, deleteCat];
};

export default useMutateCategory;

import { useFormExcelMutation } from '../../../../../store/api/excel.api';
import useNotifications from '../../../../../hooks/useNotifications';

const useExcelCreate = () => {
  const [create, { data, isLoading, error }] = useFormExcelMutation();
  const { notifyError, notifySuccess } = useNotifications();

  const createExcel = (id: number) =>
    create({ id })
      .unwrap()
      .then(() => notifySuccess('Эксель подготовлен'))
      .catch(() => notifyError('Эксель не создан'));

  return { createExcel, isLoading, error };
};

export default useExcelCreate;
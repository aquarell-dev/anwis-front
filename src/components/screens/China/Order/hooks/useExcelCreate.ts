import { useFormExcelMutation } from '../../../../../store/api/excel.api';
import useNotifications from '../../../../../hooks/useNotifications';
import { SetState } from '../../../../../utils/types';
import { TStatuses } from '../../../../../features/order/order.types';

const useExcelCreate = (selectedStatus: TStatuses, setSelectedStatus: SetState<TStatuses>) => {
  const [create, { data, isLoading, error }] = useFormExcelMutation();
  const { notifyError, notifySuccess } = useNotifications();

  const createExcel = (id: number) =>
    create({ id })
      .unwrap()
      .then(() => {
        notifySuccess('Эксель подготовлен');
        if (selectedStatus === 'Ожидает отправки поставщику')
          setSelectedStatus('Заказ оформлен');
      })
      .catch(() => notifyError('Эксель не создан'));

  return { createExcel, isLoading, error };
};

export default useExcelCreate;
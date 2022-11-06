import { IStatus, TStatuses } from '../../../../../features/order/order.types';
import { FieldPath, FieldPathValue, SetValueConfig } from 'react-hook-form';
import { IOrderForm } from '../../types';
import { useEffect } from 'react';

type TFieldName = FieldPath<IOrderForm>;

type useStatusProps = {
  selectedStatus: TStatuses,
  statuses: IStatus[] | undefined,
  setValue: (name: TFieldName, value: FieldPathValue<IOrderForm, TFieldName>, options?: SetValueConfig) => void
};

const useStatusChange = ({ selectedStatus, setValue, statuses }: useStatusProps) => {
  useEffect(() => {
    const status = statuses?.find(status => status.status === selectedStatus);
    if (status)
      setValue('status', status.id.toString());
  }, [selectedStatus])
};

export default useStatusChange;
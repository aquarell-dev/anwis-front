import { IStatus, TStatuses } from '../../../../features/order/types';

const useStatusShow = (statuses: IStatus[] | undefined, selectedStatus: TStatuses): (dependableStatus: TStatuses) => undefined | boolean => {
  if (!statuses) return () => false;

  const selected = statuses.find(status => status.status === selectedStatus);

  if (!selected) return () => false;

  return (dependableStatus: TStatuses) => {
    const dependable = statuses.find(status => status.status === dependableStatus);

    if (!dependable) return false;

    return selected.id >= dependable.id;
  };
};

export default useStatusShow;
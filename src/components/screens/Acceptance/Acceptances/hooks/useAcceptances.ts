import { useListAcceptancesQuery } from '../../../../../store/api/acceptance.api';
import { Row } from '../../types';

const useAcceptances = () => {
  const { data, isLoading, error } = useListAcceptancesQuery(null);

  const rows: Row[] | undefined = data?.map((acceptance) => ({
    id: acceptance.id,
    title: acceptance.title,
    cargo_number: acceptance.cargo_number,
    cargo_weight: acceptance.cargo_weight,
    cargo_volume: acceptance.cargo_volume,
    created_at: acceptance.created_at
  }));

  return { acceptances: data, isLoading, error, rows };
};

export default useAcceptances;

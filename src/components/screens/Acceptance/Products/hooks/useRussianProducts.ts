import { useEffect, useState } from 'react';

import { useListRussianProductsQuery } from '../../../../../store/api/acceptance.product.api';
import { RussianProductRow } from '../../types';

const useRussianProducts = () => {
  const { data: products, isLoading } = useListRussianProductsQuery(undefined);

  const [rows, setRows] = useState<RussianProductRow[]>([]);

  useEffect(() => {
    if (products) setRows(products);
  }, [products]);

  return { products, isLoading: isLoading, rows };
};

export default useRussianProducts;

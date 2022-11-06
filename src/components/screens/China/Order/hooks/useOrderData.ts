import { useEffect, useState } from 'react';
import { useListChinaDistributorsQuery } from '../../../../../store/api/distributor.api';
import { useListOrderForProjectsQuery } from '../../../../../store/api/orderForProject.api';
import { useListStatusesQuery } from '../../../../../store/api/status.api';
import { useListProductsQuery } from '../../../../../store/api/product.api';

import { TAdditional } from '../../types';
import { IOrder, IProductSpecs } from '../../../../../features/order/order.types';


const useOrderData = (order: IOrder | undefined) => {
  const { data: chinaDistributors, error: chinaError, isLoading: chinaLoading } = useListChinaDistributorsQuery(null);
  const { data: orderForProjects, error: orderError, isLoading: orderLoading } = useListOrderForProjectsQuery(null);
  const { data: statuses, error: statusError, isLoading: statusLoading } = useListStatusesQuery(null);
  const { data: products, error: productsError, isLoading: productsLoading } = useListProductsQuery(null);

  const [additional, setAdditional] = useState<TAdditional>({
    expensesRub: order ? order.total_rub : undefined,
    expensesCny: order ? order.total_cny : undefined,
    course: order ? order.course : undefined
  });
  const [selectedProducts, setSelectedProducts] = useState<IProductSpecs[]>(order?.products || []);

  const isLoading = chinaLoading || orderLoading || statusLoading || productsLoading;
  const isError = chinaError || orderError || statusError || productsError;

  useEffect(() => {
    if (additional.course) {
      const { course } = additional;
      setSelectedProducts(prev => prev.map(product => ({
        ...product,
        price_rub: product.price_cny * course
      })));
    }
  }, [additional.course, additional.indicator]);

  return {
    chinaDistributors, orderForProjects, statuses, products,
    isLoading, isError,
    additional, setAdditional,
    selectedProducts, setSelectedProducts
  }
};

export default useOrderData;
import {
  useListChinaDistributorsQuery,
  useListIndividualEntrepreneursQuery, useListOrderForProjectsQuery, useListProductsQuery, useListStatusesQuery
} from '../../../../features/order/orderApi';

const useOrderData = () => {
  const { data: chinaDistributors, error: chinaError, isLoading: chinaLoading } = useListChinaDistributorsQuery(null);
  const { data: orderForProjects, error: orderError, isLoading: orderLoading } = useListOrderForProjectsQuery(null);
  const { data: statuses, error: statusError, isLoading: statusLoading } = useListStatusesQuery(null);
  const { data: products, error: productsError, isLoading: productsLoading } = useListProductsQuery(null);

  const isLoading = chinaLoading || orderLoading || statusLoading || productsLoading;
  const isError = chinaError || orderError || statusError || productsError;

  return {
    chinaDistributors, orderForProjects, statuses, products,
    isLoading, isError,
  }
};

export default useOrderData;
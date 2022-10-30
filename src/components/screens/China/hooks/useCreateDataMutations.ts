import {
  useCreateChinaDistributorMutation,
  useCreateIndividualEntrepreneurMutation, useCreateOrderForProjectMutation
} from '../../../../features/order/orderApi';

const useCreateDataMutations = () => {
  const [createIndividualEntrepreneur, {
    isLoading: individualEntrepreneurLoading
  }] = useCreateIndividualEntrepreneurMutation();
  const [createChinaDistributor, {
    isLoading: chinaDistributorLoading
  }] = useCreateChinaDistributorMutation();
  const [createOrderForProject, {
    isLoading: orderForProjectLoading
  }] = useCreateOrderForProjectMutation();

  return {
    createIndividualEntrepreneur, createChinaDistributor, createOrderForProject,
    individualEntrepreneurLoading, chinaDistributorLoading, orderForProjectLoading
  };
};

export default useCreateDataMutations;
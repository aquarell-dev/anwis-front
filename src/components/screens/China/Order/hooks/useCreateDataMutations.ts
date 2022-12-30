import { useCreateOrderForProjectMutation } from "../../../../../store/api/project.api";
import { useCreateChinaDistributorMutation } from "../../../../../store/api/distributor.api";


const useCreateDataMutations = () => {
  const [createChinaDistributor, {
    isLoading: chinaDistributorLoading
  }] = useCreateChinaDistributorMutation();
  const [createOrderForProject, {
    isLoading: orderForProjectLoading
  }] = useCreateOrderForProjectMutation();

  return {
    createChinaDistributor, createOrderForProject,
    chinaDistributorLoading, orderForProjectLoading
  };
};

export default useCreateDataMutations;
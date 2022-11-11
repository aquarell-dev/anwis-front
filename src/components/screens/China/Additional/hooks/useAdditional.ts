import { useListChinaDistributorsQuery } from '../../../../../store/api/distributor.api';
import { useListOrderForProjectsQuery } from '../../../../../store/api/project.api';
import { useState } from 'react';

const useAdditional = () => {
  const { data: distributors, isLoading: distributorsLoading, error: distributorsError } = useListChinaDistributorsQuery(null);
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useListOrderForProjectsQuery(null);

  const [changeValue, setChangeValue] = useState('');
  const [createValue, setCreateValue] = useState('');

  return {
    projects, distributors,
    isLoading: distributorsLoading || projectsLoading,
    error: distributorsError || projectsError,
    value: changeValue, setValue: setChangeValue,
    createValue, setCreateValue
  }
};

export default useAdditional;

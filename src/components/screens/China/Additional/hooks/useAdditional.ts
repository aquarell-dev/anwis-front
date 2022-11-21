import { useState } from 'react'

import { useListChinaDistributorsQuery } from '../../../../../store/api/distributor.api'
import { useListOrderForProjectsQuery } from '../../../../../store/api/project.api'

const useAdditional = () => {
  const {
    data: distributors,
    isLoading: distributorsLoading,
    error: distributorsError
  } = useListChinaDistributorsQuery(null)
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = useListOrderForProjectsQuery(null)

  const [changeValue, setChangeValue] = useState('')
  const [createValue, setCreateValue] = useState('')

  console.log('ch', changeValue)
  console.log('cr', createValue)

  return {
    projects,
    distributors,
    isLoading: distributorsLoading || projectsLoading,
    error: distributorsError || projectsError,
    changeValue,
    setChangeValue,
    createValue,
    setCreateValue
  }
}

export default useAdditional

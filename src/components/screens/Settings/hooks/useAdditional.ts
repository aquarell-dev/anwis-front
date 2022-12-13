import { useState } from 'react'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { IChinaDistributor, IProject } from '../../../../features/order/order.types'
import { useListChinaDistributorsQuery } from '../../../../store/api/distributor.api'
import { useListOrderForProjectsQuery } from '../../../../store/api/project.api'
import { SetState } from '../../../../utils/types'

export type UseAdditional = {
  isLoading: boolean
  projects: IProject[] | undefined
  distributors: IChinaDistributor[] | undefined
  setChangeValue: SetState<string>
  createValue: string
  changeValue: string
  setCreateValue: SetState<string>
  error: FetchBaseQueryError | SerializedError | undefined
}

const useAdditional = (): UseAdditional => {
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

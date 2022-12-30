import { DependencyList, useContext, useEffect } from 'react'

import { GridLoadingContext, TGridLoadingContext } from '../index'

const useLoading = (grid?: keyof TGridLoadingContext, dependencies?: DependencyList) => {
  const context = useContext(GridLoadingContext)

  useEffect(() => {
    if (!dependencies || !grid) return

    if (dependencies.filter(Boolean).length > 0) return context[grid].setFetching(true)

    context[grid].setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { ...context }
}

export default useLoading

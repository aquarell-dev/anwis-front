import { DependencyList, useContext, useEffect } from 'react'

import { GridLoadingContext, TGridLoadingContext } from '..'

const useLoading = (grid?: keyof TGridLoadingContext, dependecies?: DependencyList) => {
  const context = useContext(GridLoadingContext)

  useEffect(() => {
    if (!dependecies || !grid) return

    if (dependecies.filter(Boolean).length > 0) return context[grid].setFetching(true)

    context[grid].setFetching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependecies)

  return { ...context }
}

export default useLoading

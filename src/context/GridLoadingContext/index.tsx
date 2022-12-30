import { FC, createContext, useState, ReactNode } from 'react'

import { SetState } from '../../utils/types'

type GridLoadingElement = { fetching: boolean; setFetching: SetState<boolean> }

export type TGridLoadingContext = {
  russianProducts: GridLoadingElement
  labels: GridLoadingElement
}

export const GridLoadingContext = createContext<TGridLoadingContext>({} as TGridLoadingContext)

const GridLoadingContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [russianProductsFetching, setRussianProductsFetching] = useState(false)
  const [labelsFetching, setLabelsFetching] = useState(false)

  return (
    <GridLoadingContext.Provider
      value={{
        russianProducts: {
          fetching: russianProductsFetching,
          setFetching: setRussianProductsFetching
        },
        labels: {
          fetching: labelsFetching,
          setFetching: setLabelsFetching
        }
      }}
    >
      {children}
    </GridLoadingContext.Provider>
  )
}

export default GridLoadingContextProvider

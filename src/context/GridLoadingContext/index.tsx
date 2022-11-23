import { FC, createContext, useState } from 'react'

import { SetState } from '../../utils/types'

type GridLoadingElement = { fetching: boolean; setFetching: SetState<boolean> }

export type TGridLoadingContext = {
  russianProducts: GridLoadingElement
}

export const GridLoadingContext = createContext<TGridLoadingContext>({} as TGridLoadingContext)

const GridLoadingContextProvider: FC = ({ children }) => {
  const [russianProductsFetching, setRussianProductsFetching] = useState(false)

  return (
    <GridLoadingContext.Provider
      value={{
        russianProducts: {
          fetching: russianProductsFetching,
          setFetching: setRussianProductsFetching
        }
      }}
    >
      {children}
    </GridLoadingContext.Provider>
  )
}

export default GridLoadingContextProvider

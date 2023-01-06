import { FC } from 'react'

import { AbsoluteCenteredContainer } from '../Container'

const Loader: FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  return (
    <AbsoluteCenteredContainer>
      <p>Loading...</p>
      {/* <PuffLoader
        color={'#059669'}
        loading={isLoading || false}
        size={100}
        aria-label='Loading Spinner'
        data-testid='loader'
      /> */}
    </AbsoluteCenteredContainer>
  )
}

export default Loader

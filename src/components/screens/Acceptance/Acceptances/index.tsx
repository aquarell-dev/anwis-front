import { FC } from 'react'

import useAcceptances from './hooks/useAcceptances'

import { IndigoButton } from '../../../ui/Button'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import Grid from './components/Grid'

const Acceptances: FC = () => {
  const { isLoading, rows } = useAcceptances()

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <div className='flex items-center space-x-4'>
        <h1 className='text-3xl font-medium'>Приемки</h1>
        <IndigoButton
          type={undefined}
          text={'Создать'}
          handler={() => {}}
        />
      </div>
      <Grid rows={rows} />
    </ContentContainer>
  )
}

export default Acceptances

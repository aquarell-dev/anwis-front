import { FC } from 'react'

import useCreateAcceptance from '../CreateAcceptance/hooks/useCreateAcceptance'
import useAcceptances from './hooks/useAcceptances'

import { IndigoButton } from '../../../ui/Button'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import Grid from './components/Grid'

const Acceptances: FC = () => {
  const { isLoading, rows, isFetching } = useAcceptances()
  const { createAcceptance, isLoading: createLoading } = useCreateAcceptance()

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <div className='flex items-center space-x-4'>
        <h1 className='text-3xl font-medium'>Приемки</h1>
        <IndigoButton
          type='button'
          text={'Создать'}
          loading={createLoading}
          handler={async () =>
            await createAcceptance({
              tasks: [],
              documents: [],
              custom_id: null,
              specifications: []
            })
          }
        />
      </div>
      <Grid
        rows={rows}
        loading={isFetching}
      />
    </ContentContainer>
  )
}

export default Acceptances

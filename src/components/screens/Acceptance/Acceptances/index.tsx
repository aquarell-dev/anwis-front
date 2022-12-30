import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'

import useCreateAcceptance from '../CreateAcceptance/hooks/useCreateAcceptance'
import useAcceptances from './hooks/useAcceptances'

import { IndigoButton } from '../../../ui/Button'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import Grid from './components/Grid'

const Acceptances: FC = () => {
  const { isLoading, rows, isFetching } = useAcceptances()
  const { createAcceptance, isLoading: createLoading } = useCreateAcceptance()

  const router = useRouter()

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <div className='flex flex-col md:flex-row items-center md:space-x-4 md:space-y-0 space-y-2'>
        <h1 className='text-3xl font-medium'>Приемки</h1>
        <IndigoButton
          type='button'
          text={'Создать'}
          loading={createLoading}
          customWidth='w-full md:w-48'
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
      <div className='d-none md:block w-full'>
        <Grid
          rows={rows}
          loading={isFetching}
        />
      </div>
      <div className='flex md:d-none mt-8 flex-col space-y-4'>
        {rows?.map(acceptance => (
          <Fragment key={acceptance.id}>
            <div
              className='w-full min-h-[250px] border-2 border-emerald-600'
              onClick={() => router.push(`../acceptances/${acceptance.id}`)}
            >
              <div className='min-h-[3rem] flex w-full items-center justify-center font-medium border-b-2 border-slate-800'>
                <p className='font-medium text-3xl text-center'>{acceptance.title}</p>
              </div>
              <div className='flex flex-col space-y-2 p-2'>
                <p className='text-2xl'>
                  <span className='font-medium'>Категории:</span> {acceptance.categories}
                </p>
                <p className='text-2xl'>
                  <span className='font-medium'>Кол-во:</span> {acceptance.quantity}
                </p>
                <p className='text-2xl'>
                  <span className='font-medium'>Создан:</span> {acceptance.created_at}
                </p>
                <p className='text-2xl'>
                  <span className='font-medium'>Из Заказа:</span>{' '}
                  {acceptance.from_order ? 'Да' : 'Нет'}
                </p>
              </div>
            </div>
            <div className='my-2 border-b-2 border-slate-800 h-1' />
          </Fragment>
        ))}
      </div>
    </ContentContainer>
  )
}

export default Acceptances

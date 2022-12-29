import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useCreateAcceptance from '../../Acceptance/CreateAcceptance/hooks/useCreateAcceptance'
import useCreateAcceptanceFromOrder from '../Order/hooks/useCreateAcceptanceFromOrder'
import useStatusShow from '../Order/hooks/useStatusShow'

import { useListOrdersQuery } from '../../../../store/api/order.api'
import { IndigoButton } from '../../../ui/Button'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import Order from '../Order/components/styled/Order'
import Navigation from './components/Navigation'
import OrderProperties from './components/OrderProperties'
import OrderSideInfo from './components/OrderSideInfo'

const Orders: FC = () => {
  const { data, error, isLoading } = useListOrdersQuery(null)

  const { createAcceptanceFromOrder, isLoading: createLoading } = useCreateAcceptanceFromOrder()

  const navigate = useNavigate()

  if (isLoading) return <Loader isLoading={isLoading} />

  if (error) return <p>Error</p>

  return (
    <ContentContainer>
      <div className='flex space-x-5'>
        <div style={{ height: 600, width: '100%' }}>
          <Navigation orders={data} />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6 mb-4'>
            {data?.map(order => (
              <React.Fragment key={order.id}>
                <Order
                  border={order.draft ? '#6b7280' : order.status.color}
                  hover={order.draft ? '#fff9f9' : order.status.hover_color}
                  onClick={() => navigate(`/china/orders/${order.id}`)}
                >
                  <div className='flex w-full h-full justify-center'>
                    <OrderSideInfo {...order} />
                    <OrderProperties {...order} />
                  </div>
                </Order>
                <div className='block md:d-none border-b border-slate-800 pb-2'>
                  {(order.status.status === 'Заказ в Москве' ||
                    order.status.status === 'Отправлен из Китая') && (
                    <>
                      {order.acceptance ? (
                        <IndigoButton
                          type='button'
                          handler={async () => await createAcceptanceFromOrder(order)}
                          text='Создать Приемку'
                          customWidth='w-full'
                          loading={createLoading}
                        />
                      ) : (
                        <div className='w-full h-8 rounded-md shadow-lg bg-emerald-500 flex items-center justify-center text-white font-medium'>
                          Приемка уже создана
                        </div>
                      )}
                    </>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}

export default Orders

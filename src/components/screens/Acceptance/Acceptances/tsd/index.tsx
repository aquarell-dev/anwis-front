import { FC, useState } from 'react'

import { Button, IndigoButton } from '../../../../ui/Button'
import { ContentContainer } from '../../../../ui/Container'
import Orders from '../../../China/Orders'
import Acceptances from '../index'

const AcceptanceTSD: FC = () => {
  const [current, setCurrent] = useState<'orders' | 'acceptances'>('acceptances')

  return (
    <ContentContainer>
      <div className='flex flex-col space-y-4 w-full'>
        <div className='flex items-center space-x-4 w-full'>
          <Button
            type='button'
            handler={() => setCurrent('orders')}
            text='Заказы'
            customWidth='w-full'
            customColors={current === 'orders' ? 'bg-emerald-500' : 'bg-gray-600'}
          />
          <Button
            type='button'
            handler={() => setCurrent('acceptances')}
            text='Приемки'
            customWidth='w-full'
            customColors={current === 'acceptances' ? 'bg-emerald-500' : 'bg-gray-600'}
          />
        </div>
        {current === 'orders' ? <Orders /> : <Acceptances />}
      </div>
    </ContentContainer>
  )
}

export default AcceptanceTSD

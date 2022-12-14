import { useRouter } from 'next/router'
import { FC } from 'react'

import { FBOShipping } from '../../../../../../types/fbo.types'
import { getFourDigitId } from '../../../../../../utils'

const ShippingCard: FC<FBOShipping> = shipping => {
  const getCategories = () =>
    [
      ...new Set(
        shipping.acceptances
          .map(a => a.specifications.map(s => s.product.category?.category))
          .flat()
      )
    ]
      .filter(Boolean)
      .join(', ')

  const router = useRouter()

  return (
    <div
      className='w-80 p-4 rounded-md shadow-xl border hover:bg-gray-100 duration-300 transition ease-in-out cursor-pointer'
      onClick={() => router.push(`./shippings/${shipping.id}`)}
    >
      <h3 className='text-xl font-medium'>
        Отгрузка ФБО {shipping.acceptances.map(a => getFourDigitId(a.id)).join(', ')}
      </h3>
      <p>
        <span className='font-medium'>ИП:</span>{' '}
        {shipping.acceptances[0]?.individual?.individual_entrepreneur}
      </p>
      <p>
        <span className='font-medium'>Проект:</span> {shipping.acceptances[0]?.project?.project}
      </p>
      <p>
        <span className='font-medium'>Категории:</span> {getCategories() || '-'}
      </p>
    </div>
  )
}

export default ShippingCard

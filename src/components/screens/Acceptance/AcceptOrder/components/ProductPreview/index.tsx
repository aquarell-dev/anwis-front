import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'

type ProductPreviewProps = {
  loading: boolean
  specification: AcceptanceProductSpecification | undefined
}

const ProductPreview: FC<ProductPreviewProps> = ({ loading, specification }) => {
  return (
    <>
      <div className='flex space-x-4 items-start border w-full border-slate-800 rounded-sm p-4'>
        {loading && (
          <SpinnerComponent
            loading
            position='centered'
            backgroundColor='#9ca3af'
          />
        )}
        <img
          src={specification?.product.photo}
          alt={specification?.product.title}
          className='h-full'
        />
        <div>
          <p className='text-3xl font-medium'>{specification?.product.title}</p>
          <p className='text-3xl font-medium'>Штрих-код: {specification?.product.barcode}</p>
        </div>
      </div>
    </>
  )
}

export default ProductPreview

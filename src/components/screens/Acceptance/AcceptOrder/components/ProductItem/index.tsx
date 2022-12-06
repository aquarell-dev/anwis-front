import { FC } from 'react'

import '../../../../../../index.css'
import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'

const ProductItem: FC<AcceptanceProductSpecification> = props => {
  const { ...specification } = props

  return (
    <div className='flex items-center space-x-2 py-2 px-4 border-b border-slate-800 children__no_shrink'>
      <p
        tabIndex={-1}
        className='border-r border-slate-800 pr-2 w-52 text-ellipsis whitespace-nowrap overflow-x-hidden'
      >
        {specification.product.title}
      </p>
      <img
        tabIndex={-1}
        src={specification.product.photo}
        alt={'-'}
        className='w-10 border-r border-slate-800 pr-2'
      />
      <p
        tabIndex={-1}
        className='border-r border-slate-800 pr-2 w-52 text-ellipsis whitespace-nowrap overflow-x-hidden'
      >
        {specification.product.linked_china_product_article ?? '-'}
      </p>
      <p
        tabIndex={-1}
        className='border-r border-slate-800 pr-2 w-20 text-ellipsis whitespace-nowrap overflow-x-hidden'
      >
        {specification.product.size}
      </p>
      {props.children}
    </div>
  )
}

export default ProductItem

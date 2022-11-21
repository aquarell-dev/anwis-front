import { ReactNode, useState } from 'react'

import { SetState } from '../../../utils/types'
import { FancyInput } from '../../ui/Input'
import { CreateCommonProduct } from '../common.types'

type CommonProductFieldsProps<T = CreateCommonProduct> = {
  product: T
  setProduct: SetState<T>
  children?: ReactNode
}

const CommonProductFields = <T extends CreateCommonProduct>(
  props: CommonProductFieldsProps<T>
): JSX.Element => {
  const { product, setProduct, children } = props
  const [noSize, setNoSize] = useState(false)

  return (
    <div className='grid grid-cols-2 gap-x-8 gap-y-4 mb-2 w-full'>
      <FancyInput
        value={product.title}
        handler={e => setProduct(prev => ({ ...prev, title: e.target.value }))}
        placeholder='Название'
        showLabel
      />
      <FancyInput
        value={product.color}
        handler={e => setProduct(prev => ({ ...prev, color: e.target.value }))}
        placeholder='Цвет'
        showLabel
      />
      <FancyInput
        value={product.brand}
        handler={e => setProduct(prev => ({ ...prev, brand: e.target.value }))}
        placeholder='Бренд'
        showLabel
      />
      <div className='flex items-end space-x-1'>
        <FancyInput
          value={product.size}
          handler={e => setProduct(prev => ({ ...prev, size: e.target.value }))}
          placeholder='Размер'
          showLabel
          customWidth='w-60'
          disabled={noSize}
        />
        <div className='flex items-center space-x-1'>
          <p className='text-sm'>Без размера</p>
          <input
            type='checkbox'
            checked={noSize}
            onChange={() => {
              setProduct(prev => ({ ...prev, size: '0' }))
              setNoSize(prev => !prev)
            }}
            className='border border-slate-800 outline-none cursor-pointer'
          />
        </div>
      </div>
      <FancyInput
        value={product.article}
        type='text'
        handler={e => setProduct(prev => ({ ...prev, article: e.target.value }))}
        placeholder='Артикул'
        showLabel
      />
      {children}
    </div>
  )
}

export default CommonProductFields

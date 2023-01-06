import { FC, useState } from 'react'
import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { FancyInput } from '../../../../../ui/Input'

type MiniShippingProductProps = {
  product: AcceptanceProduct
}

const MiniShippingProduct: FC<MiniShippingProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState('')

  return (
    <div className='flex space-x-2'>
      <div className='flex space-x-1'>
        <img
          src={product.photo}
          className='w-16'
          alt='Фото Товара'
        />
        <p>{product.title}</p>
        <p>{product.article}</p>
        <p>{product.barcode}</p>
      </div>
      <FancyInput
        value={quantity}
        handler={e => setQuantity(e.target.value)}
        placeholder='Кол-во, шт'
        showLabel
        customWidth='w-12'
      />
    </div>
  )
}

export default MiniShippingProduct

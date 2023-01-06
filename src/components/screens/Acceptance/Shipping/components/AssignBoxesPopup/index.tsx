import { FC, useEffect, useState } from 'react'
import useAutoFocus from '../../../../../../hooks/useAutoFocus'
import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { FancyInput } from '../../../../../ui/Input'
import Popup from '../../../../../ui/Popup'
import { IPopup } from '../../../../../ui/Popup/types'
import useProduct from '../../../hooks/useProduct'
import MiniShippingProduct from '../MiniShippingProduct'

type AssignBoxesPopupProps = IPopup & {}

const AssignBoxesPopup: FC<AssignBoxesPopupProps> = ({ ...popup }) => {
  const [value, setValue] = useState('')

  const { ref } = useAutoFocus()

  const { getProductByBarcode, productByBarcode, productByBarcodeFetching } = useProduct()

  const [products, setProducts] = useState<AcceptanceProduct[]>([])

  useEffect(() => {
    if (productByBarcode) setProducts(prev => [...prev, productByBarcode])
  }, [productByBarcode])

  return (
    <Popup
      {...popup}
      width='w-[1300px]'
      height='h-[800px]'
    >
      <div className='p-6'>
        <FancyInput
          ref={ref}
          value={value}
          handler={e => setValue(e.target.value)}
          placeholder='Введите значение'
          showLabel
          loading={productByBarcodeFetching}
          onKeyDown={async e => (e.key === 'Enter' ? await getProductByBarcode(value) : null)}
        />
        {products.map(product => (
          <MiniShippingProduct
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Popup>
  )
}

export default AssignBoxesPopup

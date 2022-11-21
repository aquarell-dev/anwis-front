import { FC, useState } from 'react'

import { ICreateProduct } from '../../../../../../features/order/order.types'
import { SetState } from '../../../../../../utils/types'
import CommonProductFields from '../../../../../common/CommonProductFields'

const CreateProductFields: FC<{
  product: ICreateProduct
  setProduct: SetState<ICreateProduct>
}> = ({ product, setProduct }) => {
  const { url, ...common } = product

  const [commonProduct, setCommonProduct] = useState(common)

  return (
    <CommonProductFields
      product={commonProduct}
      setProduct={setCommonProduct}
    ></CommonProductFields>
  )
}

export default CreateProductFields

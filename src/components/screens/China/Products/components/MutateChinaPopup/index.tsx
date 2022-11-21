import { FC } from 'react'

import useMutateProduct from '../../hooks/useMutateProduct'

import { ICategory, ICreateProduct, IProduct } from '../../../../../../features/order/order.types'
import { SetState } from '../../../../../../utils/types'
import CommonProductPopup from '../../../../../common/CommonProductMutatePopup'
import { FancyInput } from '../../../../../ui/Input'

type MutateChinaProductProps = {
  open: boolean
  setOpen: SetState<boolean>
  categories: ICategory[] | undefined
  product: IProduct | null
}

const MutateChinaProduct: FC<MutateChinaProductProps> = props => {
  const chinaProducts = useMutateProduct(props.product ?? undefined, props.categories)

  const { mutate, setCurrentProduct, currentProduct, ...rest } = chinaProducts

  const current = { currentProduct, setCurrentProduct }

  return (
    <CommonProductPopup<ICreateProduct>
      open={props.open}
      setOpen={props.setOpen}
      categories={props.categories}
      onMutate={mutate}
      {...rest}
      {...current}
    >
      <FancyInput
        value={currentProduct.url}
        type='text'
        handler={e => setCurrentProduct(prev => ({ ...prev, url: e.target.value }))}
        placeholder='Ссылка'
        showLabel
      />
    </CommonProductPopup>
  )
}

export default MutateChinaProduct

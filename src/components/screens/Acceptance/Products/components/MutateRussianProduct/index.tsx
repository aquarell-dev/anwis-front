import { FC, useEffect } from 'react'

import { ICategory } from '../../../../../../features/order/order.types'
import { CreateAcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import CommonProductPopup from '../../../../../common/CommonProductMutatePopup'
import { FancyInput } from '../../../../../ui/Input'

type MutateRussianProductProps = {
  open: boolean
  setOpen: SetState<boolean>
  categories: ICategory[] | undefined
  russianProduct: {
    mutate: () => void
    update: boolean
    currentProduct: CreateAcceptanceProduct
    setCurrentProduct: SetState<CreateAcceptanceProduct>
    defaultPhoto: string | undefined
    categoryLabel: string | undefined
    isLoading: boolean
    initialState: CreateAcceptanceProduct
  }
}

const MutateRussianProduct: FC<MutateRussianProductProps> = props => {
  const { mutate, setCurrentProduct, currentProduct, isLoading, initialState, ...rest } =
    props.russianProduct

  const current = { currentProduct, setCurrentProduct }

  useEffect(() => {
    if (!props.open) setCurrentProduct(initialState)
  }, [props.open])

  return (
    <CommonProductPopup<CreateAcceptanceProduct>
      open={props.open}
      setOpen={props.setOpen}
      onMutate={mutate}
      {...current}
      {...rest}
      categories={props.categories}
      loading={isLoading}
    >
      <FancyInput
        value={currentProduct.barcode}
        type='text'
        handler={e => setCurrentProduct(prev => ({ ...prev, barcode: e.target.value }))}
        placeholder='Баркод'
        showLabel
      />
      <FancyInput
        value={currentProduct.last_cost}
        type='text'
        handler={e => setCurrentProduct(prev => ({ ...prev, last_cost: Number(e.target.value) }))}
        placeholder='Себестоимость'
        showLabel
      />
      <FancyInput
        value={currentProduct.total_left}
        type='text'
        handler={e => setCurrentProduct(prev => ({ ...prev, total_left: Number(e.target.value) }))}
        placeholder='Остаток'
        showLabel
      />
      <FancyInput
        value={currentProduct.linked_china_product_article}
        type='text'
        handler={e =>
          setCurrentProduct(prev => ({ ...prev, linked_china_product_article: e.target.value }))
        }
        placeholder='Артикул ВБ'
        showLabel
      />
    </CommonProductPopup>
  )
}

export default MutateRussianProduct

import Select from 'react-select'

import { SetState } from '../../../utils/types'
import { CreateCommonProduct } from '../common.types'

type CommonCategorySelectProps<T = CreateCommonProduct> = {
  categories?: { id: number; category: string }[]
  label?: string
  product: T
  setProduct: SetState<T>
}

const CommonCategorySelect = <T extends CreateCommonProduct>(
  props: CommonCategorySelectProps<T>
) => {
  const { categories, label, product, setProduct } = props

  const options = categories?.map(category => ({
    value: category.id.toString(),
    label: category.category
  }))

  return (
    <Select
      className='w-full m-2'
      placeholder='Категория'
      name='category'
      value={product?.category && label && { value: product.category.toString(), label: label }}
      onChange={value =>
        value && setProduct(prev => ({ ...prev, category: parseInt(value.value) }))
      }
      options={options}
    />
  )
}

export default CommonCategorySelect

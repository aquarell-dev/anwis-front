import { useEffect, useState } from 'react'
import Select from 'react-select'

import { SelectValue, SetState } from '../../../utils/types'
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
  const { categories, product, setProduct } = props

  const options = categories?.map(category => ({
    value: category.id,
    label: category.category
  }))

  const [selectedCategory, setSelectedCategory] = useState<SelectValue | null>(null)

  useEffect(() => {
    if (product.category && categories) {
      const category = categories.find(c => c.id === product.category)
      if (category) setSelectedCategory({ value: category.id, label: category.category })
    }
  }, [product, categories])

  return (
    <Select
      className='w-full m-2'
      placeholder='Категория'
      name='category'
      value={selectedCategory}
      onChange={newValue => {
        setSelectedCategory(newValue)
        if (newValue) setProduct(prev => ({ ...prev, category: newValue.value }))
      }}
      options={options}
    />
  )
}

export default CommonCategorySelect

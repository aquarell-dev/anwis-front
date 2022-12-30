import { useEffect, useState } from 'react'

import { AcceptanceCategory } from '../../../../../types/acceptance.types'

const useSelectedCategory = (
  selectedCategory: string,
  categories: AcceptanceCategory[] | undefined
) => {
  const [category, setCategory] = useState<AcceptanceCategory | null>(null)

  useEffect(() => {
    if (!!selectedCategory)
      setCategory(categories?.find(category => category.category === selectedCategory) ?? null)
  }, [selectedCategory])

  return category
}

export default useSelectedCategory

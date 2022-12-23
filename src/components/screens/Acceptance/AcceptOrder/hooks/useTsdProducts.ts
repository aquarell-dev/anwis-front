import { useEffect, useState } from 'react'

import { AcceptanceCategory, AcceptanceProduct } from '../../../../../types/acceptance.types'

const useTsdProducts = (
  products: AcceptanceProduct[] | undefined,
  categories: AcceptanceCategory[] | undefined
) => {
  const [manualSelection, setManualSelection] = useState<number[]>([])
  const [expandableProducts, setExpandableProducts] = useState<
    { category: string | null; products: AcceptanceProduct[] }[]
  >([])

  useEffect(() => {
    if (!products || !categories) return

    console.log(products, categories)

    categories.forEach(category =>
      setExpandableProducts(prev => [
        ...prev,
        {
          category: category.category,
          products: products.filter(product => product.category?.category === category.category)
        }
      ])
    )

    setExpandableProducts(prev => [
      ...prev,
      { category: null, products: products.filter(p => !p.category) }
    ])

    console.log(expandableProducts)
  }, [products, categories])

  return { manualSelection, setManualSelection, expandableProducts }
}

export default useTsdProducts

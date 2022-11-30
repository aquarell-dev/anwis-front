import { useState } from 'react'

import { LabelProduct } from '../components/LabelsGrid'

const useLabelRows = <T extends LabelProduct>(products: T[]) => {
  const [printableProducts, setPrintableProducts] = useState(products)

  return { printableProducts, setPrintableProducts }
}

export default useLabelRows

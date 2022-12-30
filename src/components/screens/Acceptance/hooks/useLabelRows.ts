import { useEffect, useState } from 'react'

import useNotifications from '../../../../hooks/useNotifications'
import useGenerateLabel from '../Products/hooks/useGenerateLabel'

import { SetState } from '../../../../utils/types'
import { LabelProduct } from '../components/LabelsGrid'
import { ValidatedLabel } from '../types'

export type PrintStatus = { productId: number; path: string | undefined; status: 'no' | 'yes' }

export type UseLabelRows<T extends LabelProduct = LabelProduct> = {
  printableProducts: T[]
  setPrintableProducts: SetState<T[]>
  isLoading: boolean
  printLabels: () => Promise<void>
  printStatus: PrintStatus[]
  setPrintStatus: SetState<PrintStatus[]>
}

const useLabelRows = <T extends LabelProduct>(products: T[]): UseLabelRows<T> => {
  const { generateLabel, isLoading } = useGenerateLabel()

  const [printableProducts, setPrintableProducts] = useState(products)

  const [printStatus, setPrintStatus] = useState<PrintStatus[]>([])

  const { notifyError, notifySuccess } = useNotifications()

  const printLabels = async () => {
    let pass = true

    products.forEach(p => {
      if (!p.barcode) pass = false
    })

    if (!pass) return notifyError('Не у всех товаров присутсвует штрих-код')

    await generateLabel(
      products.map(product => ({
        ...product,
        quantity: product.printQuantity
      })) as ValidatedLabel[]
    )
  }

  useEffect(() => {
    printLabels()
      .then(() => notifySuccess('Этикетки подготовлены'))
      .catch(() => notifyError('Этикетки не были распечатаны'))
  }, [])

  return {
    printableProducts,
    setPrintableProducts,
    isLoading,
    printLabels,
    printStatus,
    setPrintStatus
  }
}

export default useLabelRows

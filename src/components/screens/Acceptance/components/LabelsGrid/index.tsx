import useLabelRows from '../../hooks/useLabelRows'

import { DataGrid } from '@mui/x-data-grid'

import { AcceptanceProduct } from '../../../../../types/acceptance.types'
import { getColumns } from './columns'

export type LabelProduct = Pick<
  AcceptanceProduct,
  'id' | 'title' | 'photo' | 'article' | 'barcode' | 'brand' | 'category' | 'size' | 'color'
> & {
  printQuantity: number
}

export type LabelGridProps<T extends LabelProduct[] = LabelProduct[]> = {
  products: T
  loading?: boolean
}

export default function LabelsGrid<T extends LabelProduct = LabelProduct>(
  props: LabelGridProps<T[]>
): JSX.Element {
  const { loading } = props

  const { printableProducts, setPrintableProducts } = useLabelRows<T>(props.products)

  const columns = getColumns()

  return (
    <DataGrid
      className='w-[95%] mx-auto h-[90%]'
      rowHeight={60}
      columns={columns}
      rows={printableProducts}
      columnVisibilityModel={{
        id: false
      }}
      onCellEditCommit={params => {
        const { id, value } = params

        setPrintableProducts(prev =>
          prev.map(product =>
            product.id === id
              ? { ...product, printQuantity: isNaN(Number(value)) ? 0 : Number(value) }
              : product
          )
        )
      }}
      loading={loading}
    />
  )
}

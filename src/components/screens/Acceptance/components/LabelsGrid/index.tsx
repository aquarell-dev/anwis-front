import { useEffect } from 'react'

import useLoading from '../../../../../context/GridLoadingContext/hooks/useLoading'
import useLabelRows from '../../hooks/useLabelRows'
import useMergePdf from '../../hooks/useMergePdf'

import { DataGrid } from '@mui/x-data-grid'
import printJS from 'print-js'

import { AcceptanceProduct } from '../../../../../types/acceptance.types'
import { IndigoButton } from '../../../../ui/Button'
import { getColumns } from './columns'

export type LabelProduct = Pick<
  AcceptanceProduct,
  | 'id'
  | 'title'
  | 'photo'
  | 'linked_china_product_article'
  | 'barcode'
  | 'brand'
  | 'category'
  | 'size'
  | 'color'
  | 'pdf'
> & {
  printQuantity: number
  actualQuantity: number
}

export type LabelGridProps<T extends LabelProduct[] = LabelProduct[]> = {
  products: T
  loading?: boolean
}

export default function LabelsGrid<T extends LabelProduct = LabelProduct>(
  props: LabelGridProps<T[]>
): JSX.Element {
  const { loading } = props

  const { printableProducts, setPrintableProducts, printStatus, isLoading, setPrintStatus } =
    useLabelRows<T>(props.products)

  const { labels } = useLoading()

  const mergePdfs = useMergePdf()

  const columns = getColumns(printableProducts, printStatus, setPrintStatus)

  return (
    <div className='flex flex-col space-y-4 h-[800px] w-full'>
      <IndigoButton
        type='button'
        handler={async () => {
          const blobUrl = await mergePdfs(printableProducts.map(p => p.pdf ?? ''))

          printJS({
            printable: blobUrl,
            type: 'pdf',
            css: 'http://localhost:8000/media/documents/style.css',
            scanStyles: true,
            targetStyles: '*',
            showModal: true
          })
        }}
        text='Распечатать Все'
      />
      <DataGrid
        className='w-[95%] mx-auto'
        style={{
          height: '800px'
        }}
        rowHeight={60}
        columns={columns}
        rows={printableProducts}
        columnVisibilityModel={{
          id: false,
          pdf: false
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
        loading={loading || labels.fetching || isLoading}
      />
    </div>
  )
}

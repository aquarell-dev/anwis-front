import { PrintStatus } from '../../hooks/useLabelRows'

import { GridColDef } from '@mui/x-data-grid'
import printJS from 'print-js'

import { LabelProduct } from '.'
import { cn } from '../../../../../utils'
import { SetState } from '../../../../../utils/types'
import ImagePreview from '../../../../ui/ImagePreview'

type Cols = (GridColDef & { field: keyof LabelProduct | 'print' | 'status' })[]

const columns: Cols = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 100,
    headerName: 'Картинка',
    renderCell: params => (
      <ImagePreview
        src={params.row.photo}
        alt={''}
      />
    )
  },
  { field: 'barcode', width: 140, headerName: 'Штрих-код' },
  { field: 'linked_china_product_article', width: 140, headerName: 'Артикул' },
  { field: 'color', width: 120, headerName: 'Цвет' },
  { field: 'size', width: 95, headerName: 'Размер' },
  { field: 'pdf', width: 95, headerName: 'ПДФ' },
  { field: 'actualQuantity', width: 110, headerName: 'Факт. Кол-во' },
  { field: 'printQuantity', width: 110, headerName: 'Нап. Кол-во', editable: true },
  { field: 'id', width: 80, headerName: 'ID' }
]

export const getColumns = <T extends LabelProduct>(
  products: T[],
  printStatus: PrintStatus[],
  setPrintStatus: SetState<PrintStatus[]>
): Cols => [
  ...columns,
  {
    field: 'print',
    width: 120,
    headerName: 'Печать',
    renderCell: params => {
      const { id } = params

      const product = products.find(p => p.id === Number(id))

      return (
        <button
          className={cn(
            'w-full h-full flex items-center justify-center font-medium text-white transition duration-300 ease-in-out select-none',
            'bg-blue-600 hover:bg-blue-700'
          )}
          onClick={async () => {
            console.log(product)

            if (!product?.pdf) return

            printJS({
              printable: product.pdf,
              type: 'pdf',
              onLoadingEnd: () =>
                setPrintStatus(prev => [
                  ...prev.filter(p => p.productId !== product.id),
                  { productId: product.id, status: 'yes', path: product.pdf }
                ]),
              css: 'http://localhost:8000/media/documents/style.css',
              scanStyles: true,
              targetStyles: '*',
              showModal: true
            })
          }}
        >
          Распечатать
        </button>
      )
    }
  },
  {
    field: 'status',
    width: 140,
    headerName: 'Статус',
    renderCell: params => {
      const { id } = params

      const status = printStatus.find(s => s.productId === Number(id))

      return (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center font-medium text-white select-none',
            status?.status === 'yes' ? 'bg-emerald-500' : 'bg-rose-500'
          )}
        >
          {status?.status === 'yes' ? 'Распечатано' : 'Не распечатано'}
        </div>
      )
    }
  }
]

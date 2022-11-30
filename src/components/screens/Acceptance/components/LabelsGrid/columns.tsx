import { GridColDef } from '@mui/x-data-grid'

import { LabelProduct } from '.'
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
  { field: 'article', width: 140, headerName: 'Артикул' },
  { field: 'color', width: 120, headerName: 'Цвет' },
  { field: 'size', width: 95, headerName: 'Размер' },
  { field: 'printQuantity', width: 80, headerName: 'Кол-во', editable: true },
  { field: 'id', width: 80, headerName: 'ID' }
]

export const getColumns = (): Cols => [
  ...columns,
  {
    field: 'print',
    width: 120,
    headerName: 'Печать',
    renderCell: params => (
      <button className='w-full h-full flex items-center justify-center font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out select-none'>
        Распечатать
      </button>
    )
  },
  {
    field: 'status',
    width: 140,
    headerName: 'Статус',
    renderCell: params => (
      <div className='w-full h-full flex items-center justify-center font-medium text-white bg-rose-500 select-none'>
        Не распечатано
      </div>
    )
  }
]

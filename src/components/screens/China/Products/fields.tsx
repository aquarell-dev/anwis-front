import { GridColDef } from '@mui/x-data-grid'

import { IProduct } from '../../../../features/order/order.types'
import ImagePreview from '../../../ui/ImagePreview'

export type Fields = GridColDef & { field: keyof IProduct | 'delete' | 'update' | 'createalike' }

export const fields: Fields[] = [
  { field: 'title', headerName: 'Название', width: 180 },
  {
    field: 'photo',
    headerName: 'Фотография',
    width: 150,
    renderCell: params => (
      <ImagePreview
        src={params.value}
        alt={'Фото'}
      />
    )
  },
  { field: 'article', headerName: 'Артикул', width: 180 },
  { field: 'size', headerName: 'Размер', width: 180 },
  { field: 'brand', headerName: 'Бренд', width: 180 },
  { field: 'color', headerName: 'Цвет', width: 180 },
  { field: 'id', headerName: 'ID', width: 70 }
]

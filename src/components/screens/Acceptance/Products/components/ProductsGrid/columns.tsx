import { RussianProductColumn } from '../../../types'

export const columns: RussianProductColumn[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  { field: 'photo', width: 180, headerName: 'Картинка' },
  { field: 'article', width: 220, headerName: 'Артикул' },
  { field: 'brand', width: 140, headerName: 'Бренд' },
  { field: 'size', width: 80, headerName: 'Размер' },
  { field: 'last_cost', width: 140, headerName: 'Себестоимость, ₽' },
  { field: 'id', width: 100, headerName: 'ID' }
]

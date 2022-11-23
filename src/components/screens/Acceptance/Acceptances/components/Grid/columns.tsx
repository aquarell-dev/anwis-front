import { GridValueGetterParams } from '@mui/x-data-grid'

import { IndigoButton } from '../../../../../ui/Button'
import { Columns } from '../../../types'

export const getAcceptanceTitle = (params: GridValueGetterParams<any, any>) =>
  params.row.title.toString().replace(' ', ' №')

export const columns: Columns[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'title', headerName: 'Название', width: 140, valueGetter: getAcceptanceTitle },
  {
    field: 'categories',
    headerName: 'Категории',
    width: 180,
    renderCell: params => <p className='w-full whitespace-pre'>{params.value}</p>
  },
  {
    field: 'total',
    headerName: 'Общая, ₽',
    width: 90
  },
  {
    field: 'quantity',
    headerName: 'Кол-во',
    width: 80
  },
  { field: 'created_at', headerName: 'Создан', width: 140 },
  {
    field: 'from_order',
    headerName: 'Из Заказа',
    width: 90,
    renderCell: params => (
      <p className='text-center w-full'>{!!params.row.from_order ? '✔️' : '❌'}</p>
    )
  }
]

export const getColumns = (navigate: (url: string) => void): Columns[] => [
  ...columns,
  {
    field: 'redirect',
    headerName: 'Перейти',
    width: 200,
    renderCell: params => (
      <IndigoButton
        type='button'
        text='Перейти'
        handler={() => navigate(`${params.row.id}/`)}
      />
    )
  }
]

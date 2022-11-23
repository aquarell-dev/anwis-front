import { GridColDef } from '@mui/x-data-grid'

import { IndigoButton } from '../../../../../ui/Button'
import ImagePreview from '../../../../../ui/ImagePreview'
import { AcceptanceProductColumn } from '../../../types'

export const fields: AcceptanceProductColumn[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 85,
    headerName: 'Картинка',
    renderCell: params => (
      <ImagePreview
        src={params.value}
        alt=''
      />
    )
  },
  { field: 'article', width: 220, headerName: 'Артикул ВБ' },
  { field: 'linked_china_product_article', width: 220, headerName: 'Артикул Поставщика' },
  { field: 'brand', width: 90, headerName: 'Бренд' },
  { field: 'size', width: 80, headerName: 'Размер' },
  { field: 'color', width: 80, headerName: 'Цвет' },
  { field: 'cost', width: 100, headerName: 'Себестоимость' },
  { field: 'quantity', width: 80, headerName: 'Кол-во' },
  { field: 'actual_quantity', width: 105, headerName: 'Реал. Кол-во', editable: true },
  { field: 'id', width: 100, headerName: 'ID' }
]

export const getColumns = (onUpdate: (id: number) => Promise<void>): GridColDef[] => [
  ...fields,
  {
    field: 'save',
    width: 140,
    headerName: 'Сохранить',
    renderCell: params => (
      <IndigoButton
        type='button'
        customWidth='w-48'
        handler={async () => {
          await onUpdate(Number(params.row.id))
        }}
        text='Сохранить'
      />
    )
  }
]

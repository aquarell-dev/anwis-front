import ImagePreview from '../../../../../ui/ImagePreview'
import { AcceptanceProductColumn } from '../../../types'

export const fields: AcceptanceProductColumn[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 160,
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
  { field: 'cost', width: 100, headerName: 'Себестоимость' },
  { field: 'quantity', width: 80, headerName: 'Кол-во' },
  { field: 'id', width: 100, headerName: 'ID' }
]

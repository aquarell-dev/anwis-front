import ImagePreview from '../../../../China/components/ImagePreview';
import { AcceptanceProductColumn } from '../../../types';

export const fields: AcceptanceProductColumn[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 160,
    headerName: 'Картинка',
    renderCell: (params) => (
      <ImagePreview
        src={params.value}
        alt=""
      />
    )
  },
  { field: 'article', width: 220, headerName: 'Артикул' },
  { field: 'brand', width: 140, headerName: 'Бренд' },
  { field: 'size', width: 80, headerName: 'Размер' },
  { field: 'quantity', width: 100, headerName: 'Количество' },
  { field: 'price_cny', width: 100, headerName: 'Цена, ю' },
  { field: 'price_rub', width: 100, headerName: 'Цена, р' },
  { field: 'additional_expenses', width: 130, headerName: 'Доп. затраты, Р' },
  { field: 'id', width: 100, headerName: 'ID' }
];

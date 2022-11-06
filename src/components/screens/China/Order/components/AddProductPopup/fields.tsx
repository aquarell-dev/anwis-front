import React from 'react';
import { Field } from '../../../types';

export const fields: Field[] = [
  { field: 'title', headerName: 'Название', width: 180 },
  {
    field: 'photo',
    headerName: 'Фотография',
    width: 150,
    renderCell: (params) => <div className='img-wrapper'><img
      alt={'Фото'}
      src={params.value}
      className='w-12 h-12 flex items-center justify-center hover-zoom'
    />
    </div>
  },
  { field: 'article', headerName: 'Артикул', width: 180 },
  { field: 'size', headerName: 'Размер', width: 180 },
  { field: 'brand', headerName: 'Бренд', width: 180 },
  { field: 'quantity', headerName: 'Кол-во', editable: true, width: 180 },
  { field: 'color', headerName: 'Цвет', width: 180 },
  { field: 'id', headerName: 'ID', width: 70 },
];
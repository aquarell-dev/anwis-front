import { Columns } from '../../../types';

export const columns: Columns[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'title', headerName: 'Название', width: 180 },
  { field: 'cargo_number', headerName: 'Номер Карго', width: 180 },
  { field: 'cargo_volume', headerName: 'Объем Карго, м3', width: 180 },
  { field: 'cargo_weight', headerName: 'Вес Карго, кг', width: 180 }
];

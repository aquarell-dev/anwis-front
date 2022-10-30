import { IProduct, IProductSpecs } from '../../../../../features/order/types';
import { GridColDef } from '@mui/x-data-grid';

export interface IProductSearchProps {
  products: IProduct[],
  handleOnSelect: (item: IProduct) => any
}

export interface IProductFields extends GridColDef {
  field: keyof IProductSpecs | keyof IProduct | 'delete';
}

export interface IProductsRows {
  id: number;
  article: number;
  title: string;
  quantity: number;
  photo: string;
  price_rub: number;
  price_cny: number;
  additional_expenses: number;
}
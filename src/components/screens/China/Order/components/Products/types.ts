import { IProduct, IProductSpecs } from '../../../../../../features/order/order.types';
import { GridColDef } from '@mui/x-data-grid';

export interface IProductSearchProps {
  products: IProduct[],
  handleOnSelect: (item: IProduct) => any,
  selectedProducts: IProductSpecs[]
}

export interface IProductFields extends GridColDef {
  field: keyof IProductSpecs | keyof IProduct | 'delete';
}

export interface IProductsRows {
  id: number;
  size: string;
  color: string;
  article: string;
  title: string;
  quantity: number;
  photo: string | undefined;
  price_rub: number;
  price_cny: number;
  additional_expenses: number;
}
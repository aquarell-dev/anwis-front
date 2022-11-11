import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import {
  IChinaDistributor,
  IOrder,
  IOrderForProject,
  IProduct,
  IProductSpecs,
  IStatus,
  TStatuses,
} from '../../../features/order/order.types';
import { SetState } from '../../../utils/types';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';

export interface IFormControls {
  register: UseFormRegister<any>;
  orderForProjects: IOrderForProject[];
  chinaDistributors: IChinaDistributor[];
  statuses: IStatus[];
  errors: FieldErrors<IOrderForm>;
  order?: IOrder;
  control: Control<IOrderForm, any>;
  setSelectedStatus: SetState<TStatuses>;
}

export interface IOrderForm {
  status: string;
  china_distributor: string;
  order_for_project: string;
  products: {
    quantity: number;
    price_rub: number;
    price_cny: number;
    product: number;
  }[];
  draft: boolean;
  commentary: string;
  tasks: any;
  documents: number[];
}

export interface IOption {
  value: string;
  label: string;
}

export interface IStatusOption extends IOption {
  color: string;
}

export interface IFormSelect {
  control: Control<IOrderForm, any>;
  name: keyof IOrderForm;
  defaultValue?: string;
  placeholder?: string;
  options: IOption[];
}

export interface IStatusSelect {
  control: Control<IOrderForm, any>;
  defaultValue?: string;
  options: IStatusOption[];
  setSelectedStatus: SetState<TStatuses>;
}

export type TAdditional = Partial<{
  course: number;
  expensesCny: number;
  expensesRub: number;
  indicator: boolean;
}>;

export type Field = {
  field: keyof IProductSpecs | keyof IProduct;
} & GridColDef;

export type AddProductProps = {
  addProductsFromDictionaryOpen: boolean;
  setAddProductsFromDictionaryOpen: SetState<boolean>;
  products: IProduct[];
  selectedProducts: IProductSpecs[];
  setSelectedProducts: SetState<IProductSpecs[]>;
};

export type CustomGridProps = {
  selectionModel: GridSelectionModel;
  setSelectionModel: SetState<GridSelectionModel>;
  buffer: Buffer[];
  setBuffer: SetState<Buffer[]>;
} & Pick<AddProductProps, 'products'>;

export type Buffer = IProduct & Pick<IProductSpecs, 'quantity'>;

export type Popups = {
  productChangeOpen: boolean;
  createSameOpen: boolean;
  productDeleteOpen: boolean;
  setCreateSameOpen: SetState<boolean>;
  setProductDeleteOpen: SetState<boolean>;
  setProductChangeOpen: SetState<boolean>;
}

export type Values = {
  copyProductId: number | null;
  setCopyProductId: SetState<number | null>,

  productUpToChange: IProduct | null;
  setProductUpToChange: SetState<IProduct | null>;

  size: string;
  setSize: SetState<string>;

  productUpToDeletion: { content: string; id: number } | null;
  setProductUpToDeletion: SetState<{ content: string; id: number } | null>;
}

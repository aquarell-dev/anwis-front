import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { IChinaDistributor, IOrder, IOrderForProject, IStatus, TStatuses } from '../../../features/order/types';
import { SetState } from '../../../utils/types';

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
  products: { quantity: number; price_rub: number, price_cny: number; product: number }[];
  draft: boolean;
  commentary: string;
  tasks: any;
}

export interface IOption {
  value: string;
  label: string
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

export type TAdditional = Partial<{course: number, expensesCny: number, expensesRub: number, indicator: boolean }>;

export type Decision = 'YES' | 'NO';
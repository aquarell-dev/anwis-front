import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IChinaDistributor, IIndividualEntrepreneur, IOrderForProject, IStatus } from '../../../features/order/types';

export interface IFormControls {
  register: UseFormRegister<any>;
  individualEntrepreneurs: IIndividualEntrepreneur[];
  orderForProjects: IOrderForProject[];
  chinaDistributors: IChinaDistributor[];
  statuses: IStatus[];
  errors: FieldErrors<IOrderForm>;
}

export interface IOrderForm {
  status: string;
  individual_entrepreneur: string;
  china_distributor: string;
  order_for_project: string;
  products: number[];
  draft: boolean;
  comment: string;
}
import { UseFormRegister } from 'react-hook-form';
import { IChinaDistributor, IIndividualEntrepreneur, IOrderForProject } from '../../../features/order/types';

export interface IFormControls {
  register: UseFormRegister<any>;
  individualEntrepreneurs: IIndividualEntrepreneur[];
  orderForProjects: IOrderForProject[];
  chinaDistributors: IChinaDistributor[];
}
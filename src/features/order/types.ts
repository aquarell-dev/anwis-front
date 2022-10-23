export interface IIndividualEntrepreneur {
  id: number;
  individual_entrepreneur: string;
}

export interface ICreateIndividualEntrepreneur extends Omit<IIndividualEntrepreneur, 'id'> {}

export interface IChinaDistributor {
  id: number;
  china_distributor: string;
}

export interface ICreateChinaDistributor extends Omit<IChinaDistributor, 'id'> {}

export interface IOrderForProject {
  id: number;
  order_for_project: string;
}

export interface ICreateOrderForProject extends Omit<IOrderForProject, 'id'> {}

export interface IStatus {
  id: number;
  status: string;
}

export interface IOrder {
  id: number;
  individual_entrepreneur: IIndividualEntrepreneur;
  china_distributor: IChinaDistributor;
  order_for_project: IOrderForProject;
  status: IStatus;
  draft: boolean;
  commentary: string;
}

export interface ICreateOrder extends Pick<IOrder, 'draft' | 'commentary'> {
  individual_entrepreneur: number;
  china_distributor: number;
  order_for_project: number;
  products: number[];
  status: number;
}

export interface IOrderRows {
  id: number;
  individual_entrepreneur: string;
  china_distributor: string;
  order_for_project: string;
  status: string;
}

export interface IProduct {
  id: number;
  title: string;
  article: number;
  price_cny: string;
  cny_to_rub_course: string;
  price_rub: string;
  photo: string;
}

export interface ICreateProduct extends Omit<IProduct, 'id'> {}

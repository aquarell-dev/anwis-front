export interface IIndividualEntrepreneur {
  id: number;
  individual_entrepreneur: string;
}

export interface ICreateIndividualEntrepreneur {
  individual_entrepreneur: string;
}

export interface IChinaDistributor {
  id: number;
  china_distributor: string;
}

export interface ICreateChinaDistributor {
  china_distributor: string;
}

export interface IOrderForProject {
  id: number;
  order_for_project: string;
}

export interface ICreateOrderForProject {
  order_for_project: string;
}

export interface IStatus {
  id: number;
  status: string;
}
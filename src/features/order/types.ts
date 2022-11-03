export interface IIndividualEntrepreneur {
  id: number;
  individual_entrepreneur: string;
}

export interface ICreateIndividualEntrepreneur extends Omit<IIndividualEntrepreneur, 'id'> {
}

export interface IChinaDistributor {
  id: number;
  china_distributor: string;
}

export interface ICreateChinaDistributor extends Omit<IChinaDistributor, 'id'> {
}

export interface IOrderForProject {
  id: number;
  order_for_project: string;
}

export interface ICreateOrderForProject extends Omit<IOrderForProject, 'id'> {
}

export type TStatuses = 'Заказ в Москве' | 'Отправлен из Китая'
  | 'Заказ оформлен' | 'Отправлен поставщику для просчета'
  | 'Ожидает заказа в Китае' | 'Ожидает отправки поставщику';

export interface IStatus {
  id: number;
  status: TStatuses;
  color: string;
  hover_color: string;
  photo: string;
}

export interface IOrder {
  id: number;
  custom_id: string;
  individual_entrepreneur: IIndividualEntrepreneur;
  china_distributor: IChinaDistributor;
  order_for_project: IOrderForProject;
  status: IStatus;
  draft: boolean;
  commentary: string;
  products: IProductSpecs[];
  date: string;
  tasks: ITask[];
  total_rub: number;
  total_cny: number;
  course: number;
  total_expenses: number;
  total_quantity: number;
  ready_date?: string;
  shipping_from_china_date?: string;
  in_moscow_date?: string;
  cargo_number?: string;
  cargo_weight?: string;
  cargo_volume?: string;
  price_per_kg: number;
  package_price: number;
  total_delivery: number;
  delivered: boolean;
}

export interface ICargoInfo extends Pick<
  IOrder,
  'cargo_number' | 'cargo_weight' | 'cargo_volume'
  | 'price_per_kg' | 'package_price' | 'total_delivery'
  | 'shipping_from_china_date' | 'in_moscow_date'> {}

type Modify<T, R> = Omit<T, keyof R> & R;

export interface ICreateUpdateOrder extends Modify<IOrder, {
  id?: number;
  individual_entrepreneur: number;
  china_distributor: number;
  order_for_project: number;
  products: ICreateProductSpecs[];
  status: number;
  tasks: number[];
}> {
}

export type PartialOrder = { id: number } & Partial<ICreateUpdateOrder>;

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
  photo: string;
  category: string;
}

export interface IProductSpecs {
  product: IProduct;
  quantity: number;
  price_cny: number;
  cny_to_rub_course: number;
  price_rub: number;
  additional_expenses: number;
}

interface ICreateProductSpecs extends Omit<IProductSpecs, 'product'> {
  product: number;
}

export interface ICreateProduct extends Omit<IProduct, 'id'> {
}

export interface ICategory {
  id: number;
  category: string;
}

export interface ICreateCategory extends Omit<ICategory, 'id'> {
  category: string;
}

export interface ITask {
  id: number;
  task: string;
  datetime: string;
}

export interface ICreateTask extends Omit<ITask, 'id'> {
}

export interface ILeftOverProduct {
  id: number;
  title: string;
  quantity: string;
}

export interface ILeftOver {
  id: number;
  products: ILeftOverProduct[];
  buffer: ILeftOverProduct[];
  title: string;
  url: string;
  photo_url: string;
  nm: string;
  total: number;
  buffer_total: number;
  last_update: string;
}
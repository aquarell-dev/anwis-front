import { CommonProduct, CreateCommonProduct } from '../../components/common/common.types'
import { Modify } from '../../utils/types'
import { TDocument } from '../documents/document.types'

export interface IIndividual {
  id: number
  individual_entrepreneur: string
}

export interface ICreateIndividual extends Omit<IIndividual, 'id'> {}

export interface IChinaDistributor {
  id: number
  china_distributor: string
}

export interface ICreateChinaDistributor extends Omit<IChinaDistributor, 'id'> {}

export interface IProject {
  id: number
  project: string
}

export interface ICreateProject extends Omit<IProject, 'id'> {}

export type TStatuses =
  | 'Заказ в Москве'
  | 'Отправлен из Китая'
  | 'Заказ оформлен'
  | 'Отправлен поставщику для просчета'
  | 'Ожидает заказа в Китае'
  | 'Ожидает отправки поставщику'

export interface IStatus {
  id: number
  status: TStatuses
  color: string
  hover_color: string
  photo: string
}

export interface IOrder {
  id: number
  custom_id: string
  individual_entrepreneur: IIndividual
  china_distributor: IChinaDistributor
  order_for_project: IProject
  status: IStatus
  draft: boolean
  commentary: string
  products: IProductSpecs[]
  date: string
  tasks: ITask[]
  total_rub: number
  total_cny: number
  course: number
  expenses_cny: number
  expenses_rub: number
  total_expenses: number
  total_quantity: number
  dollar_to_rub: number
  delivery_expenses: number
  real_total_delivery: number
  ready_date?: string
  shipping_from_china_date?: string
  in_moscow_date?: string
  real_in_moscow_date?: string
  cargo_number?: string
  cargo_weight?: string
  cargo_volume?: string
  price_per_kg: number
  package_price: number
  total_delivery: number
  packages: number
  delivered: boolean
  excel?: string
  documents?: TDocument[]
  archive: boolean
  ready: boolean
  acceptance?: number
}

export interface ICargoInfo
  extends Pick<
    IOrder,
    | 'cargo_number'
    | 'cargo_weight'
    | 'cargo_volume'
    | 'price_per_kg'
    | 'package_price'
    | 'total_delivery'
    | 'shipping_from_china_date'
    | 'in_moscow_date'
    | 'packages'
    | 'real_in_moscow_date'
    | 'dollar_to_rub'
    | 'real_total_delivery'
    | 'delivery_expenses'
  > {}

export interface ICreateUpdateOrder
  extends Modify<
    IOrder,
    {
      id?: number
      individual_entrepreneur: number
      china_distributor: number
      order_for_project: number
      products: ICreateProductSpecs[]
      status: number
      tasks: Omit<ITask, 'id'>[]
      documents: number[]
    }
  > {}

export type PartialOrder = { id: number } & Partial<ICreateUpdateOrder>

export interface IOrderRows {
  id: number
  individual_entrepreneur: string
  china_distributor: string
  order_for_project: string
  status: string
}

// standard ----------

export interface IProduct extends CommonProduct {
  url: string
}

export type ICreateProduct = Pick<IProduct, 'url'> & CreateCommonProduct

export type PartialProduct = { id: number } & Partial<ICreateProduct>

// standard --------

export interface IProductSpecs {
  product: IProduct
  quantity: number
  price_cny: number
  cny_to_rub_course: number
  price_rub: number
  additional_expenses: number
}

interface ICreateProductSpecs extends Omit<IProductSpecs, 'product'> {
  product: number
}

export interface ICategory {
  id: number
  category: string
}

export interface ICreateCategory extends Omit<ICategory, 'id'> {
  category: string
}

export interface ITask {
  id: number
  task: string
  datetime: string
}

export interface ICreateTask extends Omit<ITask, 'id'> {}

export interface ILeftOverProduct {
  id: number
  title: string
  quantity: string
}

export interface ILeftOver {
  id: number
  products: ILeftOverProduct[]
  buffer: ILeftOverProduct[]
  sorted_products: ILeftOverProduct[]
  sorted_buffer: ILeftOverProduct[]
  title: string
  url: string
  photo_url: string
  nm: string
  total: number
  buffer_total: number
  last_update: string
}

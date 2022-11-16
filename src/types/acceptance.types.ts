import { IProductSpecs } from '../features/order/order.types'
import { Modify } from '../utils/types'

export type Acceptance = {
  id: number
  title: string
  cargo_number: string
  cargo_volume: string
  cargo_weight: string
  arrived_in_moscow: string
  shipped_from_china: string
  custom_id: string | null
  created_at: string
  products: IProductSpecs[]
}

type ModifiedOrder = Modify<
  Omit<Acceptance, 'created_at'>,
  {
    products: number[]
  }
>

export type CreateAcceptance = Omit<ModifiedOrder, 'id'>

export type UpdateAcceptance = ModifiedOrder

export type PartialUpdateAcceptance = Partial<UpdateAcceptance>

//*************************
//-------------------------
//*************************

export type StaffMember = {
  id: number
  username: string
  password: string
  temporary: boolean
  inactive: boolean
}

export type CreateStaffMember = Omit<StaffMember, 'id'>

//*************************
//-------------------------
//*************************

export type AcceptanceProduct = {
  id: number
  title: string
  photo?: string
  photo_id?: string
  last_cost: number
  category?: string
  article: string
  size: string
  brand: string
  color: string
}

export type AcceptanceProductSpecification = {
  id: number
  product: AcceptanceProduct
  cost: number
  quantity: number
}

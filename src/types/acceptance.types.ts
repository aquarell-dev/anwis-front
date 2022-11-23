import { CommonProduct } from '../components/common/common.types'
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
  products: AcceptanceProductSpecification[]
  from_order?: number
}

type ModifedAcceptance = Modify<
  Omit<Acceptance, 'created_at'>,
  {
    products: number[]
  }
>

export type CreateAcceptance = Omit<ModifedAcceptance, 'id'>

export type UpdateAcceptance = ModifedAcceptance

export type UpdateDetailedProductsAcceptance = Pick<
  Modify<
    ModifedAcceptance,
    { products: Modify<AcceptanceProductSpecification, { product: number }>[] }
  >,
  'id' | 'products'
>

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
  last_cost: number
  barcode?: string
  wb_article?: string
  total_left?: number
  linked_china_product_article?: string
  linked_china_product_size?: string
} & CommonProduct

export type CreateAcceptanceProduct = Modify<
  Omit<AcceptanceProduct, 'linked_china_product_size' | 'photo_id' | 'id'>,
  { category?: number; photo?: number; last_cost?: number }
>

export type UpdateAcceptanceProduct = Partial<CreateAcceptanceProduct> & { id: number }

export type AcceptanceProductSpecification = {
  id: number
  product: AcceptanceProduct
  cost: number
  quantity: number
  boxes: Box[]
  actual_quantity?: number
}

export type AcceptanceProductSpecificationWithDetailedBoxes = Modify<
  AcceptanceProductSpecification,
  { boxes: Modify<Box, { id?: number }>[] }
>

export type PartialUpdateProductSpecification = Partial<
  Modify<AcceptanceProductSpecification, { product: number; id: number }>
>

//*************************
//-------------------------
//*************************

export type AcceptanceCategory = {
  id: number
  category: string
}

//*************************
//-------------------------
//*************************

export type Label = {
  id: number
  title: string
  barcode: string
  article: string
  size: string
  color: string
  category: string
  quantity: number
}

export type CreateLabel = Label & {
  individual: string
  composition: string
  address: string
}

//*************************
//-------------------------
//*************************

export type Box = {
  id: number
  box: string
  quantity: number
}

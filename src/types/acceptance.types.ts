import { CommonProduct, Task } from '../components/common/common.types'
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
  specifications: AcceptanceProductSpecification[]
  from_order?: number
  individual?: string
  project?: string
  tasks: Task[]
}

type ModifiedAcceptance = Modify<
  Omit<Acceptance, 'created_at'>,
  {
    specifications: number[]
  }
>

export type CreateAcceptance = Omit<ModifiedAcceptance, 'id'>

export type UpdateAcceptance = ModifiedAcceptance

export type UpdateDetailedProductsAcceptance = Pick<
  Modify<
    ModifiedAcceptance,
    {
      specifications: Modify<
        AcceptanceProductSpecification,
        { product: number; boxes: undefined }
      >[]
    }
  >,
  'id' | 'specifications'
>

export type PartialUpdateAcceptance = Partial<
  Omit<Modify<UpdateAcceptance, { tasks: Modify<Task, { id?: number }>[] }>, 'id'>
> & { id: number }

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

export type PartialUpdateProductSpecification = Partial<
  Modify<Omit<AcceptanceProductSpecification, 'id'>, { product: number }>
> & { id: number }

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

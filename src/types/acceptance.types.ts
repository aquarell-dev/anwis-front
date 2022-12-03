import { CommonCategory, CommonProduct, Task } from '../components/common/common.types'
import { TDocument } from '../features/documents/document.types'
import { Modify } from '../utils/types'

export type Acceptance = {
  id: number
  title?: string
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
  comment?: string
  documents: TDocument[]
  status: AcceptanceStatus
}

type ModifiedAcceptance = Modify<
  Omit<Acceptance, 'created_at'>,
  {
    specifications: number[]
    documents: number[]
    status?: number
  }
>

export type CreateAcceptance = Modify<
  Omit<ModifiedAcceptance, 'id'>,
  {
    specifications: Modify<AcceptanceProductSpecification, { product: number; id: undefined }>[]
  }
>

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
  Omit<
    Modify<
      ModifiedAcceptance,
      {
        tasks: Modify<Task, { id?: number }>[]
        specifications: Modify<AcceptanceProductSpecification, { id?: number; product: number }>[]
      }
    >,
    'id'
  >
> & { id: number }

//*************************
//-------------------------
//*************************

export type AcceptanceStatuses = 'Новая Приемка' | 'Упаковывается' | 'Упаковано' | 'Завершена'

export type AcceptanceStatus = {
  id: number
  status: AcceptanceStatuses
  color: string
}

//*************************
//-------------------------
//*************************

export type StaffMember = {
  id: number
  username: string
  password: string
  temporary: boolean
  inactive: boolean
  unique_number: string
}

type MutateStaffMember = Modify<StaffMember, { unique_number?: string }>

export type CreateStaffMember = Omit<MutateStaffMember, 'id'>

export type UpdateStaffMember = MutateStaffMember

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
  reasons: Reason[]
  actual_quantity?: number
}

export type CreateProductSpecification = Modify<
  AcceptanceProductSpecification,
  { product: number; id: undefined }
>

export type PartialUpdateProductSpecification = Partial<
  Modify<Omit<AcceptanceProductSpecification, 'id'>, { product: number }>
> & { id: number }

//*************************
//-------------------------
//*************************

export type PaymentOptions = 'hourly' | 'apiece'

export type AcceptanceCategory = CommonCategory & {
  payment?: PaymentOptions
  per_hour?: number
  per_piece?: number
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
  photo: string
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

export type Reason = {
  id: number
  reason: string
  quantity: number
}

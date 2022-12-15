import { CommonCategory, CommonProduct, Task } from '../components/common/common.types'
import { TDocument } from '../features/documents/document.types'
import { IIndividual, IProject } from '../features/order/order.types'
import { Modify } from '../utils/types'

export type Acceptance = {
  id: number
  title?: string
  cargo_number?: string
  cargo_volume?: string
  cargo_weight?: string
  arrived_in_moscow?: string
  shipped_from_china?: string
  custom_id: string | null
  created_at: string
  specifications: AcceptanceProductSpecification[]
  from_order?: number
  individual?: IIndividual
  project?: IProject
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
    status?: AcceptanceStatuses
    project?: number
    individual?: number
    created_at?: string
  }
>

export type CreateAcceptance = Modify<
  Omit<ModifiedAcceptance, 'id'>,
  {
    specifications: Modify<AcceptanceProductSpecification, { product: number; id: undefined }>[]
  }
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

type Session = {
  id: number
  start: string
  end?: string
}

export type WorkSession = Session & {
  box: number
  legit: boolean
}

export type MinimalisticWorkSession = Session & {
  box: Pick<Box, 'id' | 'box' | 'quantity' | 'finished'>
  legit: boolean
  staff: Pick<StaffMember, 'id' | 'username' | 'unique_number'>
}

export type WorkSessionDetailed = Modify<WorkSession, { box: Box }>

export type TimeSession = Session & {
  break_start: string
  break_end?: string
}

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
  box?: Box
  work_session?: WorkSessionDetailed
  time_session?: TimeSession
  work_sessions: WorkSessionDetailed[]
  time_sessions: TimeSession[]
  done: boolean
}

type MutateStaffMember = Modify<
  StaffMember,
  {
    unique_number?: string
    box?: number | null
    work_sessions?: WorkSession[]
    time_sessions?: number[]
    done?: boolean
  }
>

export type CreateStaffMember = Omit<
  MutateStaffMember,
  'id' | 'box' | 'work_session' | 'time_session'
>

export type UpdateStaffMember = MutateStaffMember

export type PartialUpdateStaffMember = Modify<
  Partial<MutateStaffMember>,
  {
    id: number
    unique_number: string
    work_session?: Modify<WorkSession, { start?: string; id?: number }> | null
    time_session?: Modify<TimeSession, { start?: string; break_start?: string; id?: number }> | null
  }
>

export type PartialDetailedBoxUpdateStaffMember = Modify<
  PartialUpdateStaffMember,
  { box: Partial<Omit<Box, 'id'>> & { id: number } }
>

//*************************
//-------------------------
//*************************

export type AcceptanceProduct = {
  last_cost: number
  barcode?: string
  pdf?: string
  total_left?: number
  linked_china_product_article?: string
  linked_china_product_size?: string
} & Modify<CommonProduct, { category?: AcceptanceCategory }>

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
  linked_china_product_article: string
  size: string
  color: string
  category: AcceptanceCategory
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

export type Payment = {
  id: number
  hour_cost: number
  paid_break: number
}

//*************************
//-------------------------
//*************************

export type Box = {
  id: number
  box: string
  quantity: number
  specification?: AcceptanceProductSpecification
  archive: boolean
  finished: boolean
}

export type PartialUpdateBox = Modify<Partial<Box>, { id: number }>

//*************************
//-------------------------
//*************************

export type Reason = {
  id: number
  reason: string
  quantity: number
}

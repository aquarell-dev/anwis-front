import { GridColDef } from '@mui/x-data-grid'
import { AcceptanceProduct } from './../../../types/acceptance.types'

import { IProduct, IProductSpecs } from '../../../features/order/order.types'
import {
  Acceptance,
  AcceptanceProductSpecification,
  StaffMember
} from '../../../types/acceptance.types'

export type Row = Pick<
  Acceptance,
  'id' | 'title' | 'cargo_number' | 'cargo_volume' | 'cargo_weight' | 'created_at'
>

export type Columns = GridColDef & { field: keyof Row | 'redirect' }

export type AcceptanceProductColumn = GridColDef & {
  field: keyof AcceptanceProduct | keyof AcceptanceProductSpecification
}

export type AcceptanceProductRow = Omit<IProductSpecs, 'product' | 'cny_to_rub_course'> &
  Omit<IProduct, 'photo_id' | 'url' | 'category' | 'color'>

export type StaffMemberFields = Pick<StaffMember, 'username' | 'password'>

export type RussianProductColumn = GridColDef & { field: keyof AcceptanceProduct }

export type RussianProductRow = Pick<AcceptanceProduct, 'id' | 'article' | 'brand' | 'color'>

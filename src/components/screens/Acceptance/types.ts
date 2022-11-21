import { GridColDef } from '@mui/x-data-grid'

import {
  Acceptance,
  AcceptanceProductSpecification,
  Label,
  StaffMember
} from '../../../types/acceptance.types'
import { AcceptanceProduct } from './../../../types/acceptance.types'

export type Row = Pick<
  Acceptance,
  'id' | 'title' | 'cargo_number' | 'cargo_volume' | 'cargo_weight' | 'created_at'
>

export type Columns = GridColDef & { field: keyof Row | 'redirect' }

export type AcceptanceProductColumn = GridColDef & {
  field: keyof AcceptanceProduct | keyof AcceptanceProductSpecification
}

export type AcceptanceProductRow = Omit<AcceptanceProductSpecification, 'product'> &
  Omit<
    AcceptanceProduct,
    'photo_id' | 'url' | 'category' | 'color' | 'last_cost' | 'linked_china_product_size'
  >

export type StaffMemberFields = Pick<StaffMember, 'username' | 'password'>

export type RussianProductColumn = GridColDef & {
  field: keyof AcceptanceProduct | 'update' | 'delete'
}

export type RussianProductRow = AcceptanceProduct

export type LabelRow = Label & Pick<AcceptanceProduct, 'photo'>

export type ValidatedLabel = Label

export type ValidatedProduct = Omit<ValidatedLabel, 'quantity'>

export type LabelResponse =
  | {
      status: string
      url: string
    }
  | undefined

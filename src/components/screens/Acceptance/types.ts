import { GridColDef } from '@mui/x-data-grid'

import {
  Acceptance,
  AcceptanceProductSpecification,
  Box,
  CreateAcceptance,
  Label,
  StaffMember
} from '../../../types/acceptance.types'
import { AcceptanceProduct } from './../../../types/acceptance.types'

export type Row = Pick<Acceptance, 'id' | 'title' | 'created_at' | 'from_order'> & {
  categories: string
  total: number
  quantity: number
}

export type Columns = GridColDef & { field: keyof Row | 'redirect' }

export type AcceptanceProductColumn = GridColDef & {
  field: keyof AcceptanceProductRow
}

export type AcceptanceProductRow = Omit<
  AcceptanceProductSpecification,
  'product' | 'boxes' | 'reasons'
> &
  Omit<
    AcceptanceProduct,
    'photo_id' | 'url' | 'category' | 'last_cost' | 'linked_china_product_size'
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

export type SearchSpecificationByBox = Box & { specification: AcceptanceProductSpecification }

export type Method = 'barcode' | 'box'

export type AcceptanceFields = Pick<
  CreateAcceptance,
  'cargo_number' | 'cargo_volume' | 'cargo_weight' | 'arrived_in_moscow' | 'shipped_from_china'
>

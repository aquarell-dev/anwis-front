import { Modify } from '../utils/types'
import { Acceptance } from './acceptance.types'

export type FBOShipping = {
  id: number
  acceptances: Acceptance[]
  warehouse?: string
  shipping_date?: string
  box_quantity?: number
}

export type CreateFboShipping = Modify<Omit<FBOShipping, 'id'>, { acceptances: number[] }>

export type PatchFboShipping = Partial<Modify<FBOShipping, { acceptances: number[] }>> & {
  id: number
}

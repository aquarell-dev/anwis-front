import { useState } from 'react'

import { AcceptanceCategory } from '../../../../../types/acceptance.types'

export type CategoryPayment = Pick<AcceptanceCategory, 'payment' | 'per_hour' | 'per_piece'>

const useCategoryPayment = (category: AcceptanceCategory | null) => {
  return {}
}

export default useCategoryPayment

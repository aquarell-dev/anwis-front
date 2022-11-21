import { FC } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import { Acceptance } from '../../../../../../types/acceptance.types'
import { AcceptanceProductRow } from '../../../types'
import { fields } from './columns'

const AcceptanceProductGrid: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  const rows: AcceptanceProductRow[] = acceptance.products.map(specification => ({
    id: specification.product.id,
    title: specification.product.title,
    article: specification.product.article,
    linked_china_product_article: specification.product.linked_china_product_article,
    brand: specification.product.brand,
    size: specification.product.size,
    quantity: specification.quantity,
    photo: specification.product.photo,
    cost: specification.cost
  }))

  return (
    <DataGrid
      columns={fields}
      rows={rows}
      autoHeight
    />
  )
}

export default AcceptanceProductGrid

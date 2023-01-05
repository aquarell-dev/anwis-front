import { GridColDef } from '@mui/x-data-grid'
import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import {
  fields,
  generateBoxesField
} from '../../../AcceptOrder/components/AcceptanceProductGrid/columns'

export const getColumns = (specifications: AcceptanceProductSpecification[]): GridColDef[] => [
  ...fields.filter(field => !['cost', 'quantity'].includes(field.field)),
  { field: 'fbo_quantity', headerName: 'Отгруж. Кол-во', editable: true, width: 100 },
  ...generateBoxesField(specifications)
]

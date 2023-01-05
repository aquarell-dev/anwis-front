import { DataGrid, ruRU } from '@mui/x-data-grid'
import { FC, useState } from 'react'
import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import useProducts from '../../../AcceptOrder/hooks/useProducts'
import useUpdateAcceptanceProducts from '../../../hooks/useUpdateAcceptanceProducts'
import FboToolbar from '../FboToolbar'
import { getColumns } from './columns'

type FboSpecificationProductGridProps = {
  specifications: AcceptanceProductSpecification[]
}

const FboSpecificationProductGrid: FC<FboSpecificationProductGridProps> = ({
  specifications: initialSpecifications
}) => {
  const [pageSize, setPageSize] = useState(5)

  const [specifications, setSpecifications] =
    useState<AcceptanceProductSpecification[]>(initialSpecifications)

  const { updatePartialSpecifications, updateFetching } = useUpdateAcceptanceProducts()

  const { getRows } = useProducts()

  const columns = getColumns(initialSpecifications)

  const rows = getRows(initialSpecifications)

  return (
    <div
      style={{
        height: '100%',
        maxHeight: '600px'
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        disableSelectionOnClick
        columnVisibilityModel={{
          id: false
        }}
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        autoHeight
        components={{
          Toolbar: FboToolbar
        }}
        componentsProps={{
          toolbar: {
            updateSpecifications: async () =>
              await updatePartialSpecifications(
                specifications.map(s => ({ ...s, product: s.product.id }))
              )
          }
        }}
        loading={updateFetching}
        onCellEditCommit={params => {
          const { id, value } = params

          setSpecifications(prev =>
            prev.map(specification =>
              specification.product.id === id
                ? { ...specification, fbo_quantity: Number(value) || 0 }
                : specification
            )
          )
        }}
      />
    </div>
  )
}

export default FboSpecificationProductGrid

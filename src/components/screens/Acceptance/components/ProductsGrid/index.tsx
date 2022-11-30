import { CSSProperties, FC, useState } from 'react'

import { DataGrid, GridSelectionModel, ruRU } from '@mui/x-data-grid'

import { AcceptanceCategory, AcceptanceProduct } from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'
import { RussianProductColumn, RussianProductRow } from '../../types'
import Toolbar from '../Toolbar'
import { getColumns } from './columns'

const ProductsGrid: FC<{
  rows: RussianProductRow[]
  setUpdateOpen: SetState<boolean>
  setDeleteOpen: SetState<boolean>
  loading: boolean
  selection: GridSelectionModel
  setSelection: SetState<GridSelectionModel>
  setSelectedProduct: SetState<AcceptanceProduct | null>
  products: AcceptanceProduct[] | undefined
  categories: AcceptanceCategory[] | undefined
  deleteCols?: (keyof AcceptanceProduct | 'update' | 'delete')[]
  customPaginationInitial?: number
  styles?: CSSProperties
}> = ({
  rows,
  setSelectedProduct,
  setUpdateOpen,
  setDeleteOpen,
  selection,
  setSelection,
  products,
  loading,
  categories,
  deleteCols,
  customPaginationInitial,
  styles
}) => {
  const cols: RussianProductColumn[] = getColumns(
    products,
    setSelectedProduct,
    setDeleteOpen,
    setUpdateOpen
  ).filter(col => (deleteCols ? !deleteCols.includes(col.field) : true))

  const [pageSize, setPageSize] = useState(customPaginationInitial ?? 20)

  return (
    <div className='my-5 w-full'>
      <DataGrid
        style={styles}
        rows={rows}
        checkboxSelection
        autoHeight
        disableSelectionOnClick
        columns={cols}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        pagination
        rowsPerPageOptions={[5, 10, 20, 40, 60, 75, 100]}
        selectionModel={selection}
        onSelectionModelChange={selectionModel => setSelection(selectionModel)}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        columnVisibilityModel={{
          id: false
        }}
        components={{
          Toolbar: Toolbar
        }}
        componentsProps={{
          toolbar: {
            selection,
            products,
            categories: categories ?? []
          }
        }}
        loading={loading}
      />
    </div>
  )
}

export default ProductsGrid

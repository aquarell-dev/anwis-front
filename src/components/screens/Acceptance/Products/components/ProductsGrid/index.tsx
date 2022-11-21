import { FC, useState } from 'react'

import { DataGrid, GridSelectionModel } from '@mui/x-data-grid'

import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { RussianProductColumn, RussianProductRow } from '../../../types'
import Toolbar from '../Toolbar'
import { getColumns } from './columns'

const ProductsGrid: FC<{
  rows: RussianProductRow[]
  setSelectedProduct: SetState<AcceptanceProduct | null>
  setUpdateOpen: SetState<boolean>
  setDeleteOpen: SetState<boolean>
  products: AcceptanceProduct[] | undefined
  loading: boolean
}> = ({ rows, setSelectedProduct, setUpdateOpen, setDeleteOpen, products, loading }) => {
  const cols: RussianProductColumn[] = getColumns(
    products,
    setSelectedProduct,
    setDeleteOpen,
    setUpdateOpen
  )

  const [selection, setSelection] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  return (
    <div className='my-5 w-full'>
      <DataGrid
        rows={rows}
        checkboxSelection
        autoHeight
        disableSelectionOnClick
        columns={cols}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        pagination
        rowsPerPageOptions={[20, 40, 60, 75, 100]}
        selectionModel={selection}
        onSelectionModelChange={selectionModel => setSelection(selectionModel)}
        columnVisibilityModel={{
          id: false
        }}
        components={{
          Toolbar: Toolbar
        }}
        componentsProps={{
          toolbar: {
            selection,
            products
          }
        }}
        loading={loading}
      />
    </div>
  )
}

export default ProductsGrid

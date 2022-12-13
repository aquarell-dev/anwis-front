import { CSSProperties, FC, useState } from 'react'

import useSelectedCategory from '../../Products/hooks/useSelectedCategory'

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
  selectedCategory: string
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
  selectedCategory,
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

  const category = useSelectedCategory(selectedCategory, categories)

  return (
    <div className='mt-10 w-full flex flex-col space-y-2'>
      <div className='min-h-[15px] flex space-x-4 text-xl'>
        {!!category && (
          <>
            <p>Категория: {category?.category}</p>
            <p>Тип Оплаты: {category?.payment === 'hourly' ? 'Почасовая' : 'Поштучная' ?? '-'}</p>
            <p>
              Оплата:{' '}
              {category?.payment === 'hourly'
                ? `${category.per_hour}р/час`
                : `${category?.per_piece}р/шт` ?? '-'}
            </p>
          </>
        )}
      </div>
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

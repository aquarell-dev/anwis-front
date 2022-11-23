import { FC, useState } from 'react'

import { DataGrid, GridSelectionModel, ruRU } from '@mui/x-data-grid'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import SlideAlert from '../../../../../ui/SlideAlert'
import { AcceptanceProductRow } from '../../../types'
import Toolbar from '../Toolbar'
import { getColumns } from './columns'

const AcceptanceProductGrid: FC<{
  selection: GridSelectionModel
  setSelection: SetState<GridSelectionModel>
  rows: AcceptanceProductRow[]
  loading: boolean
  setProducts: SetState<AcceptanceProductSpecification[]>
  onUpdate: () => Promise<void>
  onDetailedUpdate: (id: number) => Promise<void>
}> = ({ rows, selection, setSelection, loading, setProducts, onUpdate, onDetailedUpdate }) => {
  const columns = getColumns(id => onDetailedUpdate(id))

  const [pageSize, setPageSize] = useState(5)

  const [invalidValue, setInvalidValue] = useState('')
  const [open, setOpen] = useState(false)

  const setValueAndOpenAlert = (v: string) => {
    setInvalidValue(v)
    setOpen(true)
  }

  return (
    <>
      <SlideAlert
        title={'Неверное значение'}
        content={`Некорректное значение: ${invalidValue}. Введите правильное значение.`}
        buttonText={['Xорошо', 'Закрыть']}
        onClose={() => setOpen(false)}
        onDeny={() => setOpen(false)}
        onAccept={() => setOpen(false)}
        open={open}
      />
      <DataGrid
        columns={columns}
        rows={rows}
        autoHeight
        pageSize={pageSize}
        pagination
        rowsPerPageOptions={[5, 10, 20, 50, 75, 100]}
        onPageSizeChange={pageSize => setPageSize(pageSize)}
        columnVisibilityModel={{
          id: false
        }}
        selectionModel={selection}
        onSelectionModelChange={newSelection => setSelection(newSelection)}
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
        getRowClassName={params => {
          if (params.row.quantity !== params.row.actual_quantity) return 'bg-rose-100'
          return ''
        }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        onCellEditCommit={params => {
          const { field, id, value } = params

          if (field === 'actual_quantity') {
            if (isNaN(Number(value))) {
              setProducts(prev =>
                prev.map(p => (p.product.id === id ? { ...p, actual_quantity: undefined } : p))
              )
              return setValueAndOpenAlert(value.toString())
            }

            setProducts(prev =>
              prev.map(p => (p.product.id === id ? { ...p, actual_quantity: Number(value) } : p))
            )
          }

          const re = new RegExp('\\d{1,3}-\\d{1,3}-\\d{1,3}')

          const box = '1-1-2'.match(re)

          const pass = (box || []).length > 0

          if (!pass) return
        }}
        components={{
          Toolbar: Toolbar
        }}
        componentsProps={{
          toolbar: {
            selection,
            onUpdate
          }
        }}
      />
    </>
  )
}

export default AcceptanceProductGrid

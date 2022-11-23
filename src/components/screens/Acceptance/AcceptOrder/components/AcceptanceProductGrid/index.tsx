import { FC, useState } from 'react'

import { DataGrid, GridSelectionModel, ruRU } from '@mui/x-data-grid'

import { AcceptanceProductSpecificationWithDetailedBoxes } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import SlideAlert from '../../../../../ui/SlideAlert'
import { AcceptanceProductRow } from '../../../types'
import Toolbar from '../Toolbar'
import { getColumns, getColumnVisibilityModel } from './columns'

const AcceptanceProductGrid: FC<{
  selection: GridSelectionModel
  setSelection: SetState<GridSelectionModel>
  rows: AcceptanceProductRow[]
  loading: boolean
  setProducts: SetState<AcceptanceProductSpecificationWithDetailedBoxes[]>
  onUpdate: () => Promise<void>
  onDetailedUpdate: (id: number) => Promise<void>
  boxesCount: number
  setBoxesCount: SetState<number>
}> = ({
  rows,
  selection,
  setSelection,
  loading,
  setProducts,
  onUpdate,
  onDetailedUpdate,
  boxesCount,
  setBoxesCount
}) => {
  const columns = getColumns(id => onDetailedUpdate(id), boxesCount, setBoxesCount)

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
        columnVisibilityModel={getColumnVisibilityModel(boxesCount)}
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

          if (field.includes('box')) {
            const re = new RegExp('\\d{1,3}-\\d{1,3}-\\d{1,3}; \\d')

            const box = String(value).match(re)

            const pass = !String(value) || (box || []).length > 0

            if (!pass) {
              setProducts(prev => prev.map(p => ({ ...p, boxes: p.boxes })))
              return setValueAndOpenAlert(`${value.toString()}. Пример: 1-1-1; 45`)
            }

            const [boxNumber, boxQuantity] = String(value)
              .split(';')
              .map(v => v.trim())

            setProducts(prev =>
              prev.map(p => ({
                ...p,
                boxes: p.boxes.map(box => {
                  if (box.box === boxNumber)
                    return { id: box?.id, box: boxNumber, quantity: Number(boxQuantity) }

                  return box
                })
              }))
            )
          }
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

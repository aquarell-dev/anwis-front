import { FC, useState } from 'react'

import useEditActualQuantity from '../../hooks/useEditActualQuantity'

import { DataGrid, GridSelectionModel, ruRU } from '@mui/x-data-grid'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import SlideAlert from '../../../../../ui/SlideAlert'
import { AcceptanceProductRow } from '../../../types'
import Boxes from '../Boxes'
import Footer from '../Footer'
import Toolbar from '../Toolbar'
import { getColumns } from './columns'

const AcceptanceProductGrid: FC<{
  selection: GridSelectionModel
  setSelection: SetState<GridSelectionModel>
  rows: AcceptanceProductRow[]
  loading: boolean
  specifications: AcceptanceProductSpecification[]
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  updateAcceptanceProducts: () => Promise<void>
  updateAcceptanceProduct: (id: number) => Promise<void>
  deleteSpecifications: (ids: number[]) => Promise<void>
  updateAllSpecifications: (specifications: AcceptanceProductSpecification[]) => Promise<void>
}> = ({
  rows,
  selection,
  setSelection,
  loading,
  specifications,
  setSpecifications,
  updateAcceptanceProduct,
  updateAcceptanceProducts,
  updateAllSpecifications,
  deleteSpecifications
}) => {
  const [invalidValue, setInvalidValue] = useState('')
  const [open, setOpen] = useState(false)

  const columns = getColumns(
    id => updateAcceptanceProduct(id),
    (value: string) => {
      setInvalidValue(value)
      setOpen(true)
    },
    specifications
  )

  const [boxOpen, setBoxOpen] = useState(false)

  const [pageSize, setPageSize] = useState(5)

  const { editCellCommit } = useEditActualQuantity(setSpecifications, setOpen, setInvalidValue)

  return (
    <>
      <SlideAlert
        title={'Неверное значение'}
        content={invalidValue}
        buttonText={['Xорошо', 'Закрыть']}
        onClose={() => setOpen(false)}
        onDeny={() => setOpen(false)}
        onAccept={() => setOpen(false)}
        open={open}
      />
      <Boxes
        onUpdateAll={updateAllSpecifications}
        onDetailedUpdate={updateAcceptanceProduct}
        open={boxOpen}
        setOpen={setBoxOpen}
        specifications={specifications}
        setSpecifications={setSpecifications}
        loading={loading}
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
        getRowClassName={params =>
          params.row.quantity !== params.row.actual_quantity ? 'bg-rose-100' : 'bg-emerald-100'
        }
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        onCellEditCommit={editCellCommit}
        components={{
          Toolbar: Toolbar,
          Footer: Footer
        }}
        componentsProps={{
          toolbar: {
            selection,
            updateAcceptanceProducts,
            addBoxes: () => setBoxOpen(true),
            deleteSpecifications
          },
          footer: {
            specifications
          }
        }}
      />
    </>
  )
}

export default AcceptanceProductGrid

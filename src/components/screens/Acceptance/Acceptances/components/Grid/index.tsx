import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid'

import { Row } from '../../../types'
import { getColumns } from './columns'

const Grid: FC<{
  rows: Row[] | undefined
}> = ({ rows }) => {
  const navigate = useNavigate()

  const actualColumns = getColumns(url => navigate(url))

  return (
    <div className='my-5'>
      <DataGrid
        columns={actualColumns}
        autoHeight
        rows={rows ?? []}
        disableSelectionOnClick
        columnVisibilityModel={{
          id: false
        }}
      />
    </div>
  )
}

export default Grid

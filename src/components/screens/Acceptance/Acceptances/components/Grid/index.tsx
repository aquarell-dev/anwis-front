import { FC } from 'react'

// import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import { Row } from '../../../types'
import { getColumns } from './columns'

const Grid: FC<{
  rows: Row[] | undefined
  loading: boolean
}> = ({ rows, loading }) => {
  // const navigate = useNavigate()
  //
  // const actualColumns = getColumns(url => navigate(url))

  return (
    <div className='my-5'>
      <DataGrid
        columns={[]}
        autoHeight
        rows={rows ?? []}
        disableSelectionOnClick
        columnVisibilityModel={{
          id: false
        }}
        loading={loading}
      />
    </div>
  )
}

export default Grid

import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { Row } from '../../../types'
import { getColumns } from './columns'

const Grid: FC<{
  rows: Row[] | undefined
  loading: boolean
}> = ({ rows, loading }) => {
  const router = useRouter()

  const actualColumns = getColumns(url => router.push(url))

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
        loading={loading}
      />
    </div>
  )
}

export default Grid

import { FC } from 'react'

import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid'

const BoxEditField: FC<GridRenderEditCellParams> = params => {
  const { id, field, value } = params
  const apiRef = useGridApiContext()

  return (
    <div className='flex items-center space-x-1'>
      <input
        type='text'
        className='px-2 w-auto h-full outline-none bg-white'
        value={value}
        onChange={e => apiRef.current.setEditCellValue({ id, field, value: e.target.value })}
      />
      {String(value) && <p>шт</p>}
    </div>
  )
}

export default BoxEditField

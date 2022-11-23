import { FC } from 'react'

import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid'

import { IndigoButton } from '../../../../../ui/Button'

const Toolbar: FC<{ selection: GridSelectionModel; onUpdate: () => Promise<void> }> = ({
  selection,
  onUpdate
}) => {
  return (
    <GridToolbarContainer className='flex items-center justify-end space-x-4 mx-4 my-1'>
      <IndigoButton
        type='button'
        handler={async () => {
          await onUpdate()
        }}
        text={`Обновить(${selection.length || 'Все'})`}
        customWidth='w-60'
      />
    </GridToolbarContainer>
  )
}

export default Toolbar

import { FC } from 'react'

import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid'

import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'

const Toolbar: FC<{
  selection: GridSelectionModel
  onUpdate: () => Promise<void>
  addBoxes: () => void
  deleteSpecifications: (ids: number[]) => Promise<void>
}> = ({ selection, onUpdate, addBoxes, deleteSpecifications }) => {
  return (
    <>
      <GridToolbarContainer className='flex items-center justify-end space-x-4 mx-4 my-1'>
        <RedButton
          type='button'
          handler={async () => await deleteSpecifications(selection as number[])}
          text={`Удалить(${selection.length})`}
          disabled={!selection.length}
        />
        <GreenButton
          type='button'
          handler={addBoxes}
          text='Добавить коробки'
          customWidth='w-60'
        />
        <IndigoButton
          type='button'
          handler={async () => {
            await onUpdate()
          }}
          text={`Обновить(${selection.length || 'Все'})`}
          customWidth='w-60'
        />
      </GridToolbarContainer>
    </>
  )
}

export default Toolbar

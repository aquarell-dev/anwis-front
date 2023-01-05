import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { FC } from 'react'
import { IndigoButton } from '../../../../../ui/Button'

const FboToolbar: FC<{ updateSpecifications: () => Promise<void> }> = ({
  updateSpecifications
}) => {
  return (
    <GridToolbarContainer sx={{ mx: 1, my: 0.5 }}>
      <IndigoButton
        text='Сохранить'
        type='button'
        handler={async () => await updateSpecifications()}
      />
      <GridToolbarQuickFilter sx={{ mx: 1.5 }} />
    </GridToolbarContainer>
  )
}

export default FboToolbar

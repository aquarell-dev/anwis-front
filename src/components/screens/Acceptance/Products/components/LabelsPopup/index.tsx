import { FC } from 'react'

import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'
import { ValidatedLabel } from '../../../types'
import LabelsGrid from '../LabelsGrid'

const LabelsPopup: FC<{
  open: boolean
  setOpen: SetState<boolean>
  products: ValidatedLabel[]
  setProducts: SetState<ValidatedLabel[]>
}> = ({ open, setOpen, products, setProducts }) => {
  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[80%]'
      height='h-[65%]'
    >
      <AbsoluteCenteredContainer>
        <LabelsGrid
          products={products}
          setProducts={setProducts}
        />
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default LabelsPopup

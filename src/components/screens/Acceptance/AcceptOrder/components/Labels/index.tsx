import { FC } from 'react'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import Popup from '../../../../../ui/Popup'
import SearchProduct from '../SearchProduct'

type LabelProps = {
  labelsOpen: boolean
  setLabelsOpen: SetState<boolean>
  specifications: AcceptanceProductSpecification[]
}

const Labels: FC<LabelProps> = ({ labelsOpen, setLabelsOpen, specifications }) => {
  return (
    <Popup
      setState={setLabelsOpen}
      state={labelsOpen}
      width='w-[95%]'
      height='h-[90%]'
    >
      <SearchProduct specifications={specifications} />
    </Popup>
  )
}

export default Labels

import { FC, useEffect } from 'react'

import { GridSelectionModel } from '@mui/x-data-grid'

import {
  Acceptance,
  AcceptanceProductSpecification
} from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import Popup from '../../../../../ui/Popup'
import SearchProduct from '../SearchProduct'

type LabelProps = {
  labelsOpen: boolean
  setLabelsOpen: SetState<boolean>
  specifications: AcceptanceProductSpecification[]
  acceptance: Acceptance
}

const Labels: FC<LabelProps> = ({ labelsOpen, setLabelsOpen, specifications, acceptance }) => {
  return (
    <Popup
      setState={setLabelsOpen}
      state={labelsOpen}
      width='w-[95%]'
      height='h-[90%]'
    >
      <SearchProduct
        open={labelsOpen}
        acceptance={acceptance}
        specifications={specifications}
      />
    </Popup>
  )
}

export default Labels

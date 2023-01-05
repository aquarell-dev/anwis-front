import { FC } from 'react'

import { ListAcceptance } from '../../../../../../types/acceptance.types'
import { getFourDigitId } from '../../../../../../utils'
import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'
import { IPopup } from '../../../../../ui/Popup/types'
import FboSpecificationProductGrid from '../FboSpecificationsGrid'

type SelectProductsPopupProps = IPopup<boolean> & {
  acceptance: ListAcceptance | null
  setSubmittedAcceptances: SetState<ListAcceptance[]>
}

const SelectProductsPopup: FC<SelectProductsPopupProps> = ({
  acceptance,
  setSubmittedAcceptances,
  ...popup
}) => {
  return (
    <Popup
      {...popup}
      outside={false}
    >
      {acceptance ? (
        <div className='py-4 px-6 w-full h-full'>
          <h1 className='text-3xl font-medium mb-4'>
            {acceptance.title ?? `Приемка ${getFourDigitId(acceptance.id)}`}
          </h1>
          <FboSpecificationProductGrid
            specifications={acceptance.specifications.filter(
              s =>
                s.boxes.length > 0 && s.boxes.every(box => box.quantity !== 0) && s.actual_quantity
            )}
          />
        </div>
      ) : (
        <AbsoluteCenteredContainer>
          <p className='text-6xl'>Приемка не распознана</p>
        </AbsoluteCenteredContainer>
      )}
    </Popup>
  )
}

export default SelectProductsPopup

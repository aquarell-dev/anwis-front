import React, { FC } from 'react'

import useFocusNext from '../../../../../../hooks/useFocusNext'

import { ListAcceptance } from '../../../../../../types/acceptance.types'
import { getFourDigitId } from '../../../../../../utils'
import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'
import { IPopup } from '../../../../../ui/Popup/types'
import QuantityGridItem from '../QuantityGridItem'

type SelectProductsPopupProps = IPopup<boolean> & {
  acceptance: ListAcceptance | null
  setSubmittedAcceptances: SetState<ListAcceptance[]>
}

const SelectProductsPopup: FC<SelectProductsPopupProps> = ({
  acceptance,
  setSubmittedAcceptances,
  ...popup
}) => {
  const ref = useFocusNext()

  return (
    <Popup {...popup}>
      {acceptance ? (
        <div className='py-4 px-6 w-full h-full'>
          <h1 className='text-3xl font-medium'>
            {acceptance.title ?? `Приемка ${getFourDigitId(acceptance.id)}`}
          </h1>
          <div className='grid grid-cols-4 gap-x-4 gap-y-6 max-h-[700px] overflow-y-auto scrollbar-thin'>
            {acceptance.specifications
              .filter(
                s =>
                  s.boxes.length > 0 &&
                  s.boxes.every(box => box.quantity !== 0) &&
                  s.actual_quantity
              )
              .map(specification => (
                <QuantityGridItem
                  acceptanceId={acceptance.id}
                  specification={specification}
                  setSubmittedAcceptances={setSubmittedAcceptances}
                  key={specification.id}
                  ref={ref}
                />
              ))}
          </div>
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

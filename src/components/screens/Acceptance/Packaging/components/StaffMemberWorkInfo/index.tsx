import React, { FC, useState } from 'react'

import useSearchProduct from '../../../AcceptOrder/hooks/useSearchProduct'

import { StaffMember } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import { FancyInput } from '../../../../../ui/Input'
import Popup from '../../../../../ui/Popup'
import ProductPreview from '../../../components/ProductPreview'
import BoxPreview from '../BoxPreview'

const StaffMemberWorkInfo: FC<{
  open: boolean
  setOpen: SetState<boolean>
  staffMember: StaffMember | undefined
}> = ({ open, setOpen, staffMember }) => {
  const [code, setCode] = useState('')
  const { searchProductByBox, specificationByBox, specificationByBoxLoading } = useSearchProduct()

  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[1800px]'
      height='h-[800px]'
    >
      {staffMember ? (
        <div className='m-8 w-full h-full overflow-y-auto scrollbar-thin'>
          <div className='flex items-end space-x-12'>
            <h1 className='text-5xl'>{staffMember.username}</h1>
            <FancyInput
              value={code}
              handler={e => setCode(e.target.value)}
              placeholder='Коробка или QR-код'
              showLabel
              onKeyDown={async e => {
                if (e.key !== 'Enter') return

                await searchProductByBox(code)
              }}
              loading={specificationByBoxLoading}
            />
          </div>
          <BoxPreview specification={specificationByBox} />
        </div>
      ) : (
        <AbsoluteCenteredContainer>
          <p className='text-4xl'>Сотрудник не найден!</p>
        </AbsoluteCenteredContainer>
      )}
    </Popup>
  )
}

export default StaffMemberWorkInfo

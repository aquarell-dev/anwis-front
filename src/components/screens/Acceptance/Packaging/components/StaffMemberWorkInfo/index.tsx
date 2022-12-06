import React, { FC, useState } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import useSearch from '../../../AcceptOrder/hooks/useSearch'
import useMember from '../../hooks/useMember'

import { StaffMember } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import { FancyInput } from '../../../../../ui/Input'
import Popup from '../../../../../ui/Popup'
import BoxPreview from '../BoxPreview'

const StaffMemberWorkInfo: FC<{
  open: boolean
  setOpen: SetState<boolean>
  staffMember: StaffMember | undefined
}> = ({ open, setOpen, staffMember }) => {
  const [code, setCode] = useState('')
  const { searchBoxByNumber, boxByNumber, boxByNumberLoading } = useSearch()
  const { boundBoxAndMember, unBoundBoxAndMember, memberFetching } = useMember()

  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[1800px]'
      height='h-[800px]'
    >
      <SpinnerComponent
        loading={memberFetching}
        position='centered'
        backgroundColor='grey'
      />
      {staffMember ? (
        <div className='m-8 w-full h-full overflow-y-auto scrollbar-thin'>
          <div className='flex items-end space-x-12'>
            <h1 className='text-5xl'>{staffMember.username}</h1>
            <FancyInput
              value={code}
              handler={e => setCode(e.target.value)}
              placeholder='Поиск'
              showLabel
              onKeyDown={async e => {
                if (e.key !== 'Enter') return

                const box = await searchBoxByNumber(code)

                if (!box) return

                if (staffMember?.box?.box !== box.box)
                  await boundBoxAndMember(staffMember.id, box.id)
                else await unBoundBoxAndMember(staffMember.id, box.id)
              }}
              loading={boxByNumberLoading}
            />
            <p>Текущая коробка: {staffMember.box?.box}</p>
            <p>Оплата: {staffMember?.box?.specification?.product.category.payment}</p>
          </div>
          <BoxPreview box={staffMember.box ?? boxByNumber} />
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

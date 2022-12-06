import React, { FC, useState } from 'react'

import useMemberSearch from '../../../AcceptOrder/hooks/useMemberSearch'
import useMember from '../../../hooks/useMember'

import { StaffMember } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import { FancyInput } from '../../../../../ui/Input'
import BoxProperties from '../BoxProperties'
import PreviewPopup from '../PreviewPopup'

const StaffMemberPreview: FC<{
  open: boolean
  setOpen: SetState<boolean>
  staffMember: StaffMember | undefined
}> = ({ open, setOpen, staffMember }) => {
  const [code, setCode] = useState('')
  const { searchBoxByNumber, boxByNumber, boxByNumberLoading } = useMemberSearch()
  const { boundBoxAndMember, unBoundBoxAndMember, memberFetching } = useMember()

  return (
    <PreviewPopup
      open={open}
      setOpen={setOpen}
      fetching={memberFetching}
    >
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
            <p>Оплата: {staffMember?.box?.specification?.product.category?.payment}</p>
          </div>
          <BoxProperties box={staffMember.box ?? boxByNumber} />
        </div>
      ) : (
        <AbsoluteCenteredContainer>
          <p className='text-4xl'>Сотрудник не найден!</p>
        </AbsoluteCenteredContainer>
      )}
    </PreviewPopup>
  )
}

export default StaffMemberPreview

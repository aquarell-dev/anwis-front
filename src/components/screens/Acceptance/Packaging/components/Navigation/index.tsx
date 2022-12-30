import React, { FC, useEffect, useState } from 'react'

import useAutoFocus from '../../../../../../hooks/useAutoFocus'
import useMemberSearch from '../../../AcceptOrder/hooks/useMemberSearch'
import useQrCode, { QrCode } from '../../hooks/useQrCode'

import { Box, StaffMember } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'

const Navigation: FC<{
  open: boolean
  setOpen: SetState<boolean>
  staffMember: StaffMember
  unboundBox: (staff: StaffMember, onSuccess?: (() => void) | undefined) => Promise<void>
  boundBox: (
    staff: StaffMember,
    box: Box | undefined,
    onSuccess?: (() => void) | undefined
  ) => Promise<void>
  boundAnotherMemberToBox: (staff: StaffMember, memberUniqueNumber: string) => Promise<void>
}> = ({ staffMember, setOpen, open, boundAnotherMemberToBox, boundBox, unboundBox }) => {
  const [firstSearchField, setFirstSearchField] = useState('')
  const [secondSearchField, setSecondSearchField] = useState('')

  const { searchBoxByNumber, boxByNumberLoading } = useMemberSearch()

  const { validateQrCodes, sessionLoading, memberFetching } = useQrCode()

  useEffect(() => {
    if (!open) {
      setFirstSearchField('')
      setSecondSearchField('')
    }
  }, [open])

  const { ref } = useAutoFocus()

  return (
    <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-end space-x-12 w-fit'>
      <h1 className='text-2xl lg:text-5xl text-center lg:text-left w-full'>
        {staffMember.username}({staffMember.unique_number})
      </h1>
      <div className='flex w-full flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 items-center lg:space-x-4'>
        <FancyInput
          ref={ref}
          value={firstSearchField}
          handler={e => setFirstSearchField(e.target.value)}
          placeholder='Поиск'
          showLabel
          customWidth='w-full lg:w-64'
          onKeyDown={async e => {
            if (e.key !== 'Enter') return

            const isValueQrCode = await validateQrCodes(
              firstSearchField as QrCode,
              staffMember,
              () => setOpen(false)
            )

            if (!isValueQrCode && firstSearchField.match(/^\d{1,3}-\d{1,3}-\d{1,3}$/)) {
              const box = await searchBoxByNumber(firstSearchField)
              await boundBox(staffMember, box, () => setOpen(false))
            }
          }}
          loading={boxByNumberLoading || sessionLoading || memberFetching}
        />
        <FancyInput
          value={secondSearchField}
          handler={e => setSecondSearchField(e.target.value)}
          placeholder='Действия'
          showLabel
          customWidth='w-full lg:w-64'
          disabled={!!staffMember.time_session}
          onKeyDown={async e => {
            if (e.key !== 'Enter') return

            if (secondSearchField.match(/^\d{1,3}$/)) {
              await boundAnotherMemberToBox(staffMember, secondSearchField)
            }

            if (secondSearchField.match(/^\d{1,3}-\d{1,3}-\d{1,3}$/)) {
              await unboundBox(staffMember, () => setOpen(false))
            }
          }}
          loading={false}
        />
      </div>
    </div>
  )
}

export default Navigation

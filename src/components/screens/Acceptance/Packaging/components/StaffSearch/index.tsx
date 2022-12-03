import React, { FC, useState } from 'react'

import useMember from '../../hooks/useMember'

import { FancyInput } from '../../../../../ui/Input'
import StaffMemberWorkInfo from '../StaffMemberWorkInfo'

const StaffSearch: FC = () => {
  const { getMemberByUniqueNumber, fetchedMember, open, setOpen, getMemberFetching } = useMember()

  const [uniqueNumber, setUniqueNumber] = useState('')

  return (
    <>
      <StaffMemberWorkInfo
        open={open}
        setOpen={setOpen}
        staffMember={fetchedMember}
      />
      <div className='mb-4 w-full flex justify-end'>
        <FancyInput
          value={uniqueNumber}
          placeholder='Поиск'
          handler={e => setUniqueNumber(e.target.value)}
          searchIcon
          showLabel
          loading={getMemberFetching}
          onKeyDown={async e => {
            if (e.key !== 'Enter') return

            const member = await getMemberByUniqueNumber(uniqueNumber)

            if (member) setOpen(true)
          }}
        />
      </div>
    </>
  )
}

export default StaffSearch

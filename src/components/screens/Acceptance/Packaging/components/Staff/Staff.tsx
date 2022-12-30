import React, { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { StaffMember as TStaffMember } from '../../../../../../types/acceptance.types'
import StaffMember from '../StaffMember'

const Staff: FC<{ members: TStaffMember[]; loading: boolean }> = ({ members, loading }) => {
  return (
    <div className='w-full border-t border-slate-800 py-4 min-h-[120px]'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-x-4 gap-y-6'>
        <SpinnerComponent
          loading={loading}
          position='centered'
          backgroundColor='grey'
        />
        {members?.map(member => (
          <StaffMember
            {...member}
            key={member.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Staff

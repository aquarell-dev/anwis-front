import React, { FC } from 'react'

import { StaffMember as TStaffMember } from '../../../../../../types/acceptance.types'

const StaffMember: FC<TStaffMember> = props => {
  return (
    <>
      <div className='relative w-full h-fit p-4 rounded-sm shadow-xl border border-3 border-rose-600 bg-emerald-100'>
        <div className='flex items-center space-x-2'>
          <div className='rounded-full flex items-center justify-center border border-black w-16 h-16 border-2 p-4'>
            <p className='text-6xl font-medium text-red-500'>{props.unique_number}</p>
          </div>
          <p className='text-6xl'>{props.username}</p>
        </div>
      </div>
    </>
  )
}

export default StaffMember

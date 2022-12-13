import { FC } from 'react'

import { StaffMember } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'

const MembersGrid: FC<{
  members: StaffMember[] | undefined
  setSelectedMember: SetState<StaffMember>
  setOpen: SetState<boolean>
}> = ({ members, setSelectedMember, setOpen }) => {
  return (
    <div className='grid grid-cols-5 gap-x-4 gap-y-2 my-8'>
      {members?.map(member => (
        <div
          key={member.id}
          onClick={() => {
            setSelectedMember(member)
            setOpen(true)
          }}
          className='w-fit text-xl h-fit p-4 rounded-md shadow-lg flex flex-col space-y-1 bg-slate-900 cursor-pointer hover:bg-slate-800 duration-300 transition ease-in-out text-white'
        >
          <p>
            Логин: <span className='font-medium'>{member.username}</span>
          </p>
          <p>
            Пароль: <span className='font-medium'>{member.password}</span>
          </p>
          <p>
            Номер: <span className='font-medium'>{member.unique_number}</span>
          </p>
          <p>
            Временный: <span className='font-medium'>{member.temporary ? '✅' : '❌'}</span>
          </p>
          <p>
            Неактивен: <span className='font-medium'>{member.inactive ? '✅' : '❌'}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default MembersGrid

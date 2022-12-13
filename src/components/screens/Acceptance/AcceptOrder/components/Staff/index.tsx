import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { useListWorkSessionsByAcceptanceQuery } from '../../../../../../store/api/session.api'
import { Acceptance } from '../../../../../../types/acceptance.types'

const Staff: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  const { data, isLoading } = useListWorkSessionsByAcceptanceQuery(acceptance.id)

  return (
    <div className='w-1/2 rounded-md shadow-xl p-4 border h-full'>
      <SpinnerComponent
        loading={isLoading}
        position='centered'
        backgroundColor='grey'
      />
      <h1 className='text-xl w-fit px-1 font-medium mb-4 border-b border-slate-600'>Сотрудники</h1>
      <div className='flex items-start space-x-4 overflow-y-auto scrollbar-thin'>
        <div className='flex flex-col space-y-2 p-2 border-r-2 border-slate-600 w-[140px]'>
          {data
            ?.filter(s => s.box.finished)
            .map(s => (
              <p key={s.id}>{s.staff.username}</p>
            ))}
        </div>
        <div className='flex flex-col space-y-2'>
          {data
            ?.filter(s => s.box.finished)
            .map(session => (
              <p key={session.id}>
                Сотрудник{' '}
                <span className='font-medium'>
                  {session.staff.username}({session.staff.unique_number})
                </span>{' '}
                упаковал коробку <span className='font-medium'>{session.box.box}</span>(
                {session.start} -{'>'} {session.end})
              </p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Staff

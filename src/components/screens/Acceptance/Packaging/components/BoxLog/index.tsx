import React, { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { useListWorkSessionsByBoxQuery } from '../../../../../../store/api/session.api'

const BoxLog: FC = () => {
  const { data, isLoading } = useListWorkSessionsByBoxQuery('1-1-1')

  console.log(data)

  return (
    <div className='flex flex-col space-y-2'>
      <SpinnerComponent
        loading={isLoading}
        position='centered'
        backgroundColor='grey'
      />
      {data?.map(session => (
        <p
          key={session.id}
          className='max-w-[300px]'
        >
          Сотрудник{' '}
          <span className='font-medium'>
            {session.staff.username}({session.staff.unique_number})
          </span>{' '}
          упаковывал коробку <span className='font-medium'>{session.box.box}</span> с{' '}
          <span className='font-medium'>
            {session.start} по {session.end}
          </span>
        </p>
      ))}
    </div>
  )
}

export default BoxLog

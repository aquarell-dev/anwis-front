import React, { FC } from 'react'

import useTimer from '../../../../../../hooks/useTimer'

import { StaffMember } from '../../../../../../types/acceptance.types'
import BoxProperties from '../BoxProperties'

const StaffMemberWorkInfo: FC<StaffMember> = staffMember => {
  const sessionTimer = useTimer(staffMember?.time_session?.start)
  const breakTimer = useTimer(staffMember?.time_session?.break_start)
  const productTimer = useTimer(staffMember?.work_session?.start, true)

  return (
    <>
      <div className='flex items-start space-x-4 mt-6 w-full'>
        <div className='flex space-x-2 w-full'>
          <BoxProperties box={staffMember.box} />
          {staffMember.box?.specification?.product.category?.payment === 'hourly' && (
            <div className='flex flex-col space-y-2 text-xl'>
              <p className='text-2xl border-b border-slate-800 px-2 py-1'>
                Работа по времени идет: <span className='font-medium text-3xl'>{productTimer}</span>
              </p>
              <p className='text-2xl'>Начало: {staffMember.work_session?.start}</p>
              <p className='text-2xl'>Конец: {staffMember.work_session?.end ?? 'Не закончено'}</p>
            </div>
          )}
        </div>
        {staffMember.time_session && (
          <div className='flex flex-col space-y-2 text-xl'>
            <p>Время Начала: {staffMember.time_session?.start}</p>
            <p>Сессия Уже Идет: {sessionTimer}</p>
            <p>Перерыв: {staffMember.time_session?.break_start ? breakTimer : '-'}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default StaffMemberWorkInfo

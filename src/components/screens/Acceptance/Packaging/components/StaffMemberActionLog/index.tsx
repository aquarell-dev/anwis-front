import React, { FC } from 'react'

import useMemberWage from '../../hooks/useMemberWage'

import { StaffMember } from '../../../../../../types/acceptance.types'

const StaffMemberActionLog: FC<StaffMember> = staff => {
  const { wage, calculateTimePayment, calculateBoxPayment } = useMemberWage(
    staff.work_sessions,
    staff.time_sessions
  )

  return (
    <div className='w-[290px] sm:w-[400px] lg:w-1/3 2xl:w-[400px] mt-10 min-h-[150px] lg:max-h-[700px] lg:overflow-y-auto lg:scrollbar-thin'>
      <div className='flex flex-col space-y-3 w-full border-b border-slate-600 py-0 px-0 sm:py-2 sm:px-4 text-xl'>
        <p>Заработано&nbsp;Всего: {wage.total}&nbsp;₽</p>
        <p>Заработано За&nbsp;Упаковку По&nbsp;Штукам: {wage.boxes.box}&nbsp;₽</p>
        <p>Заработано За&nbsp;Упаковку По&nbsp;Времени: {wage.boxes.time}&nbsp;₽</p>
        <p>Заработано По&nbsp;Времени: {wage.time}&nbsp;₽</p>
      </div>
      <div className='w-full flex flex-col space-y-2 px-0 py-0 lg:px-4 lg:py-2'>
        {staff.work_sessions
          .filter(s => s.legit)
          .map(s => {
            const [box, time] = calculateBoxPayment(s)

            return (
              <div key={s.id}>
                {s.box.specification?.product.category?.payment === 'hourly' ? (
                  <p>
                    Коробка: {s.box.box} - Упаковано&nbsp;c&nbsp;{s.start.split(' ')[0]}
                    &nbsp;по&nbsp;
                    {s.end?.split(' ')[0] ?? '(Не\u00A0закончено)'} - Оплата:&nbsp;Почасовая -
                    Кол-во:&nbsp;
                    {s.box.specification?.quantity} - Заработано:&nbsp;
                    {time}&nbsp;₽
                  </p>
                ) : (
                  <p>
                    Коробка: {s.box.box} - Упаковано&nbsp;c&nbsp;{s.start.split(' ')[0]}
                    &nbsp;по&nbsp;
                    {s.end?.split(' ')[0] ?? `(Не\u00A0закончено)`} - Оплата:&nbsp;Поштучная -
                    Кол-во:&nbsp;
                    {s.box.specification?.quantity} - Заработано:&nbsp;
                    {s.end ? box : '(Не\u00A0Закончено)'}&nbsp;₽
                  </p>
                )}
              </div>
            )
          })}
        {staff.time_sessions.map(s => (
          <p key={s.id}>
            Начало c {s.start.split(' ')[0]} по {s.end?.split(' ')[0] ?? '(Не\u00A0закончено)'} -
            Оплата:&nbsp;Почасовая - Заработано:&nbsp;
            {s.end ? calculateTimePayment(s, 200) + '₽' : '(Не\u00A0закончено)'}
          </p>
        ))}
      </div>
    </div>
  )
}

export default StaffMemberActionLog

import React, { FC } from 'react'

import useMemberWage from '../../hooks/useMemberWage'

import { StaffMember } from '../../../../../../types/acceptance.types'

const StaffMemberActionLog: FC<StaffMember> = staff => {
  const { wage, calculateTimePayment, calculateBoxPayment } = useMemberWage(
    staff.work_sessions,
    staff.time_sessions
  )

  return (
    <div className='w-1/3 mt-10 max-h-[700px] overflow-y-auto scrollbar-thin'>
      <div className='flex flex-col space-y-3 w-full border-b border-slate-600 py-2 px-4 text-xl'>
        <p>Заработано Всего: {wage.total} ₽</p>
        <p>Заработано За Упаковку По Штукам: {wage.boxes.box} ₽</p>
        <p>Заработано За Упаковку По Времени: {wage.boxes.time} ₽</p>
        <p>Заработано По Времени: {wage.time} ₽</p>
      </div>
      <div className='w-full flex flex-col space-y-2 px-4 py-2'>
        {staff.work_sessions
          .filter(s => s.legit)
          .map(s => {
            const [box, time] = calculateBoxPayment(s)

            return (
              <div key={s.id}>
                {s.box.specification?.product.category?.payment === 'hourly' ? (
                  <p>
                    Коробка: {s.box.box} - Упаковано c {s.start.split(' ')[0]} по{' '}
                    {s.end?.split(' ')[0] ?? '(Не закончено)'} - Оплата:&nbsp;Почасовая -
                    Кол-во:&nbsp;
                    {s.box.specification?.quantity} - Заработано:&nbsp;
                    {time}&nbsp;₽
                  </p>
                ) : (
                  <p>
                    Коробка: {s.box.box} - Упаковано c {s.start.split(' ')[0]} по{' '}
                    {s.end?.split(' ')[0] ?? '(Не закончено)'} - Оплата:&nbsp;Поштучная -
                    Кол-во:&nbsp;
                    {s.box.specification?.quantity} - Заработано:&nbsp;
                    {box}&nbsp;₽
                  </p>
                )}
              </div>
            )
          })}
        {staff.time_sessions.map(s => (
          <p key={s.id}>
            Начало c {s.start.split(' ')[0]} по {s.end?.split(' ')[0] ?? '(Не закончено)'} -
            Оплата:&nbsp;Почасовая - Заработано:&nbsp;
            {s.end ? calculateTimePayment(s, 200) + '₽' : '(Не закончено)'}
          </p>
        ))}
      </div>
    </div>
  )
}

export default StaffMemberActionLog

import React, { FC, useMemo } from 'react'

import useTimer from '../../../../../../hooks/useTimer'
import useMemberWage from '../../hooks/useMemberWage'

import { MinimalisticWorkSession, StaffMember } from '../../../../../../types/acceptance.types'
import SliderItem from '../PackagingSlider/components/SliderItem'

const PackagingMember: FC<{
  member: StaffMember
  sessions: MinimalisticWorkSession[] | undefined
}> = ({ member, sessions }) => {
  const workTimer = useTimer(member.work_session?.start)
  const timeTimer = useTimer(member.time_session?.start)
  const { wage } = useMemberWage(member.work_sessions, member.time_sessions)

  const memberTotalPacked = member.work_sessions
    .filter(s => s.legit && !s.end)
    .reduce(
      (prev, curr) => ({
        ...curr,
        box: { ...curr.box, quantity: curr.box.quantity + prev.box.quantity }
      }),
      { box: { quantity: 0 } }
    ).box.quantity

  const session = useMemo(
    () => ({
      left: sessions
        ?.filter(s => !s.end)
        .reduce(
          (prev, curr) => ({
            ...curr,
            box: { ...curr.box, quantity: curr.box.quantity + prev.box.quantity }
          }),
          { box: { quantity: 0 } }
        ).box.quantity,
      already: sessions
        ?.filter(s => s.end)
        .reduce(
          (prev, curr) => ({
            ...curr,
            box: { ...curr.box, quantity: curr.box.quantity + prev.box.quantity }
          }),
          { box: { quantity: 0 } }
        ).box.quantity
    }),
    [sessions]
  )

  return (
    <SliderItem>
      <div className='flex flex-col text-center lg:text-left justify-center items-center space-y-2 py-4'>
        <h1 className='text-xl lg:text-5xl'>
          {member.username}({member.unique_number}) -{' '}
          {member.time_session
            ? 'По Времени - ' + timeTimer
            : member.work_session?.box.specification?.product.category?.payment === 'hourly'
            ? 'Упаковка(По Времени) - ' + workTimer
            : 'Упаковка(По Штукам)'}
        </h1>
        <p className='text-lg lg:text-4xl border-b border-slate-800 py-2 px-8'>
          Предварительня Выплата – {wage.total}&nbsp;₽
        </p>
        <p className='text-lg lg:text-4xl'>
          Выплата за упаковку по времени – {wage.boxes.time}&nbsp;₽
        </p>
        <p className='text-lg lg:text-4xl'>
          Выплата за упаковку по штукам – {wage.boxes.box}&nbsp;₽
        </p>
        <p className='text-lg lg:text-4xl'>Выплата по времени – {wage.time}&nbsp;₽</p>
        <p className='text-lg lg:text-4xl'>
          Упаковано Сотрудником Коробок: {member.work_sessions.length}
        </p>
        <p className='text-lg lg:text-4xl'>
          Упакованное Кол-во Сотрудником: {memberTotalPacked}&nbsp;шт
        </p>
        {member.work_session?.box && (
          <p className='text-lg lg:text-xl mb-16'>
            Номер Коробки: ◈&nbsp;{member.work_session?.box.box}&nbsp;◈
          </p>
        )}
        <p className='border-t border-slate-800 p-4 w-full text-center text-lg lg:text-4xl'>
          Осталось Всего: {session.left}&nbsp;шт ||| Упаковано Уже: {session.already}&nbsp;ШТ
        </p>
      </div>
    </SliderItem>
  )
}

export default PackagingMember

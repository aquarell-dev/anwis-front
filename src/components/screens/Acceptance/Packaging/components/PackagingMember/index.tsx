import React, { FC } from 'react'

import useTimer from '../../../../../../hooks/useTimer'

import { StaffMember } from '../../../../../../types/acceptance.types'
import SliderItem from '../PackagingSlider/components/SliderItem'

const PackagingMember: FC<{ member: StaffMember }> = ({ member }) => {
  const timer = useTimer(member.session?.start)

  return (
    <SliderItem>
      <div className='flex flex-col justify-center items-center space-y-2 py-4'>
        <h1 className='text-6xl'>
          {member.username}({member.unique_number}) - {timer}
        </h1>
        <p className='text-4xl'>Упаковано: 47 ШТ | Текущая выплата (только за упаковку) – 235 ₽</p>
        <p className='text-3xl'>Количество Коробок: 1</p>
        <p className='text-xl mb-16'>Номера Коробок: ◈ 9-3-1 ◈ </p>
        <p className='border-t border-slate-800 p-4 w-full text-center text-4xl'>
          Осталось: 3 ШТ ||| Упаковано Уже: 47 ШТ
        </p>
      </div>
    </SliderItem>
  )
}

export default PackagingMember

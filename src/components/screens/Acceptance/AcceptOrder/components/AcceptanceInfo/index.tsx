import { FC } from 'react'

import { Acceptance } from '../../../../../../types/acceptance.types'

const AcceptanceInfo: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  return (
    <div className='w-full rounded-md shadow-xl p-4 border'>
      <h1 className='text-xl mb-4 border-b w-fit px-2 border-slate-600'>Информация о Карго</h1>
      <div className='grid grid-cols-1 gap-x-4 gap-y-2'>
        <p className='border-b borde-slate-700'>
          <span className='font-medium'> Номер Карго:</span> {acceptance.cargo_number}
        </p>
        <p className='border-b borde-slate-700'>
          <span className='font-medium'> Объем Карго, м3:</span> {acceptance.cargo_volume}
        </p>
        <p className='border-b borde-slate-700'>
          <span className='font-medium'> Вес Карго, кг:</span> {acceptance.cargo_weight}
        </p>
        <p className='border-b borde-slate-700'>
          <span className='font-medium'> Дата Отправки из Китая:</span>{' '}
          {acceptance.shipped_from_china}
        </p>
        <p className='border-b borde-slate-700'>
          <span className='font-medium'> Дата Приезда в Москву:</span>{' '}
          {acceptance.arrived_in_moscow}
        </p>
      </div>
    </div>
  )
}

export default AcceptanceInfo

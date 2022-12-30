import { FC } from 'react'

import { Acceptance } from '../../../../../../types/acceptance.types'

const AcceptanceTotal: FC<{ acceptance: Acceptance | undefined }> = ({ acceptance }) => {
  const total = acceptance?.specifications.reduce((prev, curr) => ({
    ...curr,
    cost: prev.cost + curr.cost
  })).cost

  return (
    <div className='p-4 w-[29%] flex items-center shadow-xl border rounded-md'>
      <p className='text-xl'>
        Полная стоимость: <span className='font-medium'>{total}, ₽</span>
      </p>
    </div>
  )
}

export default AcceptanceTotal

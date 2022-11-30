import { FC } from 'react'

import { Acceptance } from '../../../../../../types/acceptance.types'
import AcceptanceInfo from '../AcceptanceInfo'
import Staff from '../Staff'

const Management: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  return (
    <div className='w-full flex space-x-4 border-t py-4 h-[320px] border-slate-800 items-center'>
      {acceptance?.from_order && <AcceptanceInfo acceptance={acceptance} />}
      <Staff />
    </div>
  )
}

export default Management

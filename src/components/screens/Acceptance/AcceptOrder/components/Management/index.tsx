import { FC } from 'react'

import { Acceptance } from '../../../../../../types/acceptance.types'
import AcceptanceInfo from '../AcceptanceInfo'
import Staff from '../Staff'

const Management: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  return (
    <div className='d-none w-full lg:flex space-x-4 border-t py-4 h-[320px] border-slate-800 items-center'>
      {acceptance?.from_order && <AcceptanceInfo acceptance={acceptance} />}
      <Staff acceptance={acceptance} />
    </div>
  )
}

export default Management

import { FC } from 'react'

import { Acceptance } from '../../../../../../types/acceptance.types'
import AcceptanceInfo from '../AcceptanceInfo'
import Staff from '../Staff'

const Management: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  return (
    <div className='grid grid-cols-2 gap-x-4 my-4'>
      <AcceptanceInfo acceptance={acceptance} />
      <Staff />
    </div>
  )
}

export default Management

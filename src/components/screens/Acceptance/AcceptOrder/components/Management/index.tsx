import { FC } from 'react'

import { Acceptance } from '../../../../../../types/acceptance.types'
import AcceptanceInfo from '../AcceptanceInfo'
import Packages from '../Packages'
import Staff from '../Staff'

const Management: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  return (
    <div className='grid grid-cols-3 gap-x-4 my-4'>
      <AcceptanceInfo acceptance={acceptance} />
      <Packages />
      <Staff />
    </div>
  )
}

export default Management

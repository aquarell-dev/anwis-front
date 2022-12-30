import { FC } from 'react'

import { SetState } from '../../../../../../utils/types'
import { IndigoButton } from '../../../../../ui/Button'

const Navigation: FC<{ setMemberOpen: SetState<boolean> }> = ({ setMemberOpen }) => {
  return (
    <>
      <div className='flex flex-col sm:flex-row items-center space-y-4 space-x-4'>
        <h1 className='text-2xl font-medium'>Сотрудники</h1>
        <IndigoButton
          type={undefined}
          handler={() => setMemberOpen(true)}
          text='Создать'
          customWidth='w-60'
        />
      </div>
    </>
  )
}

export default Navigation

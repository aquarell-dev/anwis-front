import React, { FC, useState } from 'react'

import useAutoFocus from '../../../../../../hooks/useAutoFocus'
import useNotifications from '../../../../../../hooks/useNotifications'

import { SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'

const ExitInput: FC<{ setOpen: SetState<boolean> }> = ({ setOpen }) => {
  const [value, setValue] = useState('')

  const { notifyError } = useNotifications()

  const { ref } = useAutoFocus()

  return (
    <div className='absolute right-0 top-0 m-12 z-[200]'>
      <FancyInput
        ref={ref}
        value={value}
        handler={e => setValue(e.target.value)}
        placeholder='Закрыть/Отменить Действие'
        // showLabel
        customWidth='w-full lg:w-80'
        onKeyDown={e => {
          if (e.key !== 'Enter') return
          if (!['Закрыть', 'Отменить Последнее Действие'].includes(value))
            return notifyError('Можно ввести только "Закрыть" или "Отменить Последнее Действие"')
          setOpen(false)
        }}
      />
    </div>
  )
}

export default ExitInput

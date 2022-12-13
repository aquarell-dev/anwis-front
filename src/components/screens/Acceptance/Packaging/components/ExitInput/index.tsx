import React, { FC, useState } from 'react'

import useNotifications from '../../../../../../hooks/useNotifications'

import { SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'

const ExitInput: FC<{ setOpen: SetState<boolean> }> = ({ setOpen }) => {
  const [value, setValue] = useState('')

  const { notifyError } = useNotifications()

  return (
    <div className='absolute right-0 top-0 m-12'>
      <FancyInput
        value={value}
        handler={e => setValue(e.target.value)}
        placeholder='Закрыть'
        showLabel
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

import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'

const ContorlPanel: FC<{ updateAcceptance: () => Promise<void> }> = ({ updateAcceptance }) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col space-y-4 lg:space-y-0 lg:flex-row space-x-0 lg:space-x-4 py-4 items-center border-t border-slate-800'>
      <IndigoButton
        type='button'
        handler={async () => await updateAcceptance()}
        text='Сохранить'
        customWidth='w-60'
      />
      <GreenButton
        type='button'
        handler={async () => {
          await updateAcceptance()
          navigate('../../')
        }}
        text='Сохранить и Закрыть'
        customWidth='w-60'
      />
      <RedButton
        type='button'
        handler={() => {}}
        text='Удалить Приемку'
        customWidth='w-60'
      />
    </div>
  )
}

export default ContorlPanel

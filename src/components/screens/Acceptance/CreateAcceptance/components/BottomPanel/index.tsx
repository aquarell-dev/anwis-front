import { FC } from 'react'

import { NavigationAfter } from '../../hooks/useCreateAcceptance'

import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'

const BottomPanel: FC<{ createAcceptance: (navigation?: NavigationAfter) => Promise<void> }> = ({
  createAcceptance
}) => {
  return (
    <div className='flex items-center space-x-4 mt-4 mb-8'>
      <IndigoButton
        type='button'
        handler={async () => await createAcceptance()}
        text='Создать'
        customWidth='w-60'
      />
      <GreenButton
        type='button'
        handler={async () => await createAcceptance({ navigateToAcceptance: true })}
        text='Создать И Перейти'
        customWidth='w-60'
      />
      <RedButton
        type='button'
        handler={async () => await createAcceptance({ customUrl: '../' })}
        text='Создать и Закрыть'
        customWidth='w-60'
      />
    </div>
  )
}

export default BottomPanel

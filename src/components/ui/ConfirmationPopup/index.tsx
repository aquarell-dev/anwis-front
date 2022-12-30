import { FC, ReactNode } from 'react'

import { SetState } from '../../../utils/types'
import { IndigoButton, RedButton } from '../Button'
import { AbsoluteCenteredContainer } from '../Container'
import Popup from '../Popup'

const ConfirmationPopup: FC<{
  open: boolean
  setOpen: SetState<boolean>
  deleteQuestion: ReactNode
  loading?: boolean
  onConfirm: () => void
  width?: string
  height?: string
  closeOnEnd?: boolean
  closeOnStart?: boolean
  children?: ReactNode
}> = ({
  open,
  setOpen,
  onConfirm,
  deleteQuestion,
  loading,
  width,
  height,
  closeOnEnd,
  closeOnStart,
  children
}) => {
  return (
    <Popup
      state={open}
      bgColor='bg-slate-100'
      setState={setOpen}
      width={width ?? 'w-[500px]'}
      height={height}
    >
      <AbsoluteCenteredContainer>
        <p className='text-center text-xl'>{deleteQuestion}</p>
        {children}
        <div className='flex m-2 items-center space-x-4'>
          <IndigoButton
            loading={loading}
            type='button'
            text='Да'
            handler={() => {
              if (closeOnStart) setOpen(false)
              onConfirm()
              if (closeOnEnd) setOpen(false)
            }}
          />
          <RedButton
            type='button'
            text='Нет'
            handler={() => setOpen(false)}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default ConfirmationPopup

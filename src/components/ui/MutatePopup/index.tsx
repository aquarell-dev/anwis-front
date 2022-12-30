import { FC, ReactNode, useEffect } from 'react'

import { SetState } from '../../../utils/types'
import { IndigoButton } from '../Button'
import { AbsoluteCenteredContainer } from '../Container'
import { FancyInput } from '../Input'
import Popup from '../Popup'

const MutatePopup: FC<{
  open: boolean
  setOpen: SetState<boolean>
  content: string
  onMutate: () => void
  value?: string
  setValue?: SetState<string>
  children?: ReactNode
  width?: string
  height?: string
  loading?: boolean
  placeholder?: string
  clearOnClose?: boolean
  closeOnEnd?: boolean
}> = ({
  open,
  setOpen,
  content,
  value,
  setValue,
  width,
  height,
  children,
  onMutate,
  loading,
  placeholder,
  clearOnClose,
  closeOnEnd
}) => {
  useEffect(() => {
    if (!open && clearOnClose) setValue && setValue('')
  }, [clearOnClose, open, setValue])

  return (
    <Popup
      state={open}
      setState={setOpen}
      width={width}
      height={height}
    >
      <AbsoluteCenteredContainer>
        <h1 className='text-xl mb-2 mt-4 text-center'>{content}</h1>
        {children ?? (
          <FancyInput
            value={value}
            customWidth='w-80'
            handler={e => setValue && setValue(e.target.value)}
            placeholder={placeholder ?? ''}
            showLabel
          />
        )}
        <div className='flex items-center justify-center mt-2 mb-4'>
          <IndigoButton
            text='Продолжить'
            type='button'
            handler={() => {
              onMutate()
              if (closeOnEnd) setOpen(false)
            }}
            loading={loading}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default MutatePopup

import { ButtonHTMLAttributes, ChangeEvent, FC, ReactNode, useRef } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { cn } from '../../../utils'
import { SetState } from '../../../utils/types'

interface IButton {
  type: ButtonHTMLAttributes<string>['type'] | undefined
  text?: string
  handler: () => any
  customWidth?: string
  customColors?: string
  icon?: ReactNode
  children?: ReactNode
  loading?: boolean
  disabled?: boolean
}

export const Button: FC<IButton> = ({
  children,
  text,
  handler,
  type,
  customWidth,
  customColors,
  icon,
  loading,
  disabled
}) => {
  return (
    <div
      className={cn(
        'flex items-center min-h-[40px] justify-center text-white transition duration-300 ease-in-out rounded-md',
        customWidth ?? 'w-40',
        disabled ? 'bg-slate-500' : customColors ?? 'bg-gray-600 hover:bg-gray-700'
      )}
    >
      {loading ? (
        <SpinnerComponent
          loading
          position='inline'
        />
      ) : (
        <>
          <button
            onClick={handler}
            disabled={disabled}
            type={type ?? 'submit'}
            className={cn(
              'w-full h-full py-2 flex items-center space-x-1 justify-center',
              disabled ? 'cursor-auto' : 'cursor-pointer'
            )}
          >
            {icon}
            {children ? children : text}
          </button>
        </>
      )}
    </div>
  )
}

type FileButton = {
  setFiles?: SetState<FileList | null>
  multiple?: boolean
  text?: string
  accept?: string | undefined
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & Omit<IButton, 'type' | 'text' | 'handler'>

export const FileButton: FC<FileButton> = props => {
  const hiddenInput = useRef<HTMLInputElement | null>(null)

  const { setFiles, multiple, text, accept, onChange, ...button } = props

  return (
    <>
      <IndigoButton
        type='button'
        text={text ?? 'Загрузить файл'}
        handler={() => hiddenInput.current?.click()}
        {...button}
      />
      <input
        type='file'
        ref={hiddenInput}
        onChange={onChange ? e => onChange(e) : e => setFiles && setFiles(e.target.files)}
        style={{ display: 'none' }}
        multiple={multiple ?? false}
        accept={accept}
      />
    </>
  )
}

export const IndigoButton: FC<IButton> = props => {
  return (
    <Button
      {...props}
      customColors={'bg-indigo-600 hover:bg-indigo-700'}
    />
  )
}

export const GreenButton: FC<IButton> = props => {
  return (
    <Button
      {...props}
      customColors={'bg-emerald-500 hover:bg-indigo-600'}
    />
  )
}

export const RedButton: FC<IButton> = props => {
  return (
    <Button
      {...props}
      customColors={'bg-red-600 hover:bg-orange-700'}
    />
  )
}

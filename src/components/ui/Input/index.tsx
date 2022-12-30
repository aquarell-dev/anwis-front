import React, { FC, forwardRef } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { cn } from '../../../utils'
import { IInput, IRHFInput, IRHFSelect } from './types'

export const Input: FC<IInput> = ({
  type,
  placeholder,
  handler,
  value,
  additionalStyles,
  disabled
}) => (
  <input
    className={cn(
      'py-2 px-4 outline-none w-full shadow-md rounded-md',
      additionalStyles ? additionalStyles : 'bg-gray-100'
    )}
    type={type}
    placeholder={placeholder}
    disabled={disabled}
    step={'any'}
    onChange={handler}
    value={value}
  />
)

export const FancyInput = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const {
    customWidth,
    placeholder,
    handler,
    value,
    additionalStyles,
    showLabel,
    defaultValue,
    searchIcon,
    type = 'text',
    loading,
    ...rest
  } = props

  return (
    <div className='flex flex-col space-y-1'>
      {showLabel && <p className='text-sm'>{placeholder}</p>}
      <div
        className={cn(
          'flex space-x-2 py-1 px-2 border border-gray-300 rounded-sm items-center',
          additionalStyles ?? '',
          customWidth ?? 'w-64 xl:w-96',
          rest?.disabled ? 'bg-gray-100' : 'bg-white'
        )}
      >
        {searchIcon && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        )}
        <input
          ref={ref}
          className={cn('outline-none w-full', rest?.disabled ? 'bg-gray-100' : 'bg-white')}
          defaultValue={defaultValue}
          type={type}
          step={'0.01'}
          min={'0'}
          max={'99999'}
          onChange={handler}
          value={value ?? ''}
          {...rest}
          placeholder={placeholder}
        />
        {loading && (
          <SpinnerComponent
            loading={true}
            position='inline'
          />
        )}
      </div>
    </div>
  )
})

export const Checkbox: FC<{
  label: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}> = ({ label, checked, onChange }) => {
  return (
    <div className='flex space-x-2'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='cursor-pointer accent-indigo-600'
      />
      <p className='text-sm'>{label}</p>
    </div>
  )
}

export const RHFInput: FC<IRHFInput> = ({ label, register, required, ...inputProps }) => (
  <input
    className='py-2 px-4 outline-none w-full bg-gray-100 shadow-md rounded-md'
    {...inputProps}
    {...register(label, { required })}
  />
)

export const RHFSelect: FC<IRHFSelect> = ({
  label,
  register,
  required,
  text,
  options,
  defaultValue,
  error,
  ...inputProps
}) => {
  return (
    <div className='w-full'>
      <label
        htmlFor='countries'
        className='block text-sm font-medium text-gray-900'
      >
        {text}
      </label>
      <select
        id='countries'
        {...inputProps}
        {...register(label, { required })}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black'
      >
        {defaultValue ? (
          <option value={defaultValue.value}>{defaultValue.label}</option>
        ) : (
          <option value={''}>------------</option>
        )}
        {options.map((option, idx) => (
          <React.Fragment key={idx}>
            <option value={option.value}>{option.label}</option>
          </React.Fragment>
        ))}
      </select>
      {error && <p className={'text-[12px] font-medium text-red-600'}>Выберите опцию</p>}
    </div>
  )
}

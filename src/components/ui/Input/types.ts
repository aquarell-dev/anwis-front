import React, { HTMLProps } from 'react'
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form'

import { IOrder } from '../../../features/order/order.types'

export interface IInput extends HTMLProps<HTMLInputElement> {
  value: string | number | undefined
  handler: React.ChangeEventHandler<HTMLInputElement>
  type?: React.HTMLInputTypeAttribute
  placeholder?: string | undefined
  additionalStyles?: string
  customWidth?: string
  showLabel?: boolean
  searchIcon?: boolean
  error?: boolean
}

interface IRHF {
  label: string
  register: UseFormRegister<any> // TODO fix typing here
  required: boolean | string
  error?: string | undefined | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

export interface IRHFInput extends IRHF, Pick<IInput, 'placeholder' | 'type'> {}

export interface IRHFSelect extends IRHF {
  text: string
  options: { value: string | number; label: string | number | React.ReactNode }[]
  defaultValue?: { value: string | number; label: string | number }
}

export interface IOrderSelect extends IRHFSelect {
  order?: IOrder
}

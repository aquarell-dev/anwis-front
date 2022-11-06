import React from 'react';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { IOrder } from '../../../features/order/order.types';

export interface IInput {
  type?: React.HTMLInputTypeAttribute;
  value: string | number | undefined;
  handler: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: boolean;
  additionalStyles?: string;
  disabled?: boolean;
  customWidth?: string;
  showLabel?: boolean;
  defaultValue?: string | number;
  restProps?: any[];
}

interface IRHF {
  label: string;
  register: UseFormRegister<any>; // TODO fix typing here
  required: boolean | string;
  error?: string | undefined | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export interface IRHFInput extends IRHF, Pick<IInput, 'placeholder' | 'type'> {}

export interface IRHFSelect extends IRHF {
  text: string;
  options: { value: string | number; label: string | number | React.ReactNode; }[];
  defaultValue?: { value: string | number; label: string | number; };
}

export interface IOrderSelect extends IRHFSelect {
  order?: IOrder;
}
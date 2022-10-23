import React from 'react';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';

export interface IInput {
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  handler: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: boolean;
  additionalStyles?: string;
  disabled?: boolean;
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
  options: { value: string | number; label: string | number; }[];
  defaultValue?: string;
}
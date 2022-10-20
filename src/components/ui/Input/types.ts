import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface IInput {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  handler: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: boolean;
}

interface IRHF {
  label: string;
  register: UseFormRegister<any>; // TODO fix typing here
  required: boolean | string;
}

export interface IRHFInput extends IRHF, Pick<IInput, 'placeholder' | 'type'> {}

export interface IRHFSelect extends IRHF {
  text: string;
  options: { value: string; label: string; }[];
  defaultValue?: string;
}
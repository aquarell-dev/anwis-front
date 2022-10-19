import { UseFormRegister } from 'react-hook-form';

import React from 'react';

export interface IInput {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  handler: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: boolean;
}

export interface IRHFInput extends Pick<IInput, 'placeholder' | 'type'> {
  label: string;
  register: UseFormRegister<any>; // TODO fix typing here
  required: boolean | string;
}

export interface IUserCredentials {
  username: string;
  password: string;
}

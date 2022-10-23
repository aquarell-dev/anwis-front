import React, { FC } from 'react';

import { IInput, IRHFInput, IRHFSelect } from './types';

import { cn } from '../../../utils';

export const Input: FC<IInput> = ({ type, placeholder, handler, value, additionalStyles, disabled }) => <input
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
/>;

export const RHFInput: FC<IRHFInput> = ({ label, register, required, ...inputProps }) =>
  <input
    className='py-2 px-4 outline-none w-full bg-gray-100 shadow-md rounded-md'
    {...inputProps}
    {...register(label, { required,  })}
  />;

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
        htmlFor="countries"
        className="block text-sm font-medium text-gray-900"
      >
        {text}
      </label>
      <select
        id="countries"
        {...inputProps}
        {...register(label, { required })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
      >
        <option value={''}>------------</option>
        {options.map((option, idx) => (
          <React.Fragment key={idx}>
            <option value={option.value}>{option.label}</option>
          </React.Fragment>
        ))}
      </select>
      {error && <p className={'text-[12px] font-medium text-red-600'}>Выберите опцию</p>}
    </div>
  );
};

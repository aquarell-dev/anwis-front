import React from 'react';
import { FC } from 'react';
import { IInput, IRHFInput, IRHFSelect } from './types';

export const Input: FC<IInput> = ({ type, placeholder, handler, value }) => <input
  className='py-2 px-4 outline-none w-full bg-gray-100 shadow-md rounded-md'
  type={type}
  placeholder={placeholder}
  onChange={handler}
  value={value}
/>;

export const RHFInput: FC<IRHFInput> = ({ label, register, required, ...inputProps }) =>
  <input
    className='py-2 px-4 outline-none w-full bg-gray-100 shadow-md rounded-md'
    {...inputProps}
    {...register(label, { required })}
  />;

export const RHFSelect: FC<IRHFSelect> = ({
                                            label,
                                            register,
                                            required,
                                            text,
                                            options,
                                            defaultValue,
                                            ...inputProps
                                          }) => {
  return (
    <div className='w-full'>
      <label
        htmlFor="countries"
        className="block text-sm font-medium text-gray-900"
      >{text}</label>
      <select
        id="countries"
        {...inputProps}
        {...register(label, { required })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
      >
        <option defaultValue={defaultValue ?? text}>{defaultValue ?? text}</option>
        {options.map((option, idx) => (
          <React.Fragment key={idx}>
            <option value={option.value}>{option.label}</option>
          </React.Fragment>
        ))}
      </select>
    </div>
  );
};

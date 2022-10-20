import React from 'react';
import { FC } from 'react';
import { IRHFInput, IRHFSelect } from './types';

export const RHFInput: FC<IRHFInput> = ({ label, register, required, ...inputProps }) =>
  <input
    className='py-2 px-4 outline-none bg-gray-100 shadow-md rounded-md'
    {...inputProps}
    {...register(label, { required })}
  />;

export const RHFSelect: FC<IRHFSelect> = ({ label, register, required, text, options, defaultValue, ...inputProps }) => {
  return (
    <>
      <label htmlFor="countries" className="block text-sm font-medium text-gray-900">{text}</label>
      <select id="countries"
              {...inputProps}
              {...register(label, { required })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black">
        <option defaultValue={defaultValue ?? text}>{defaultValue ?? text}</option>
        {options.map((option, idx) => (
          <React.Fragment key={idx}>
            <option value={option.value}>{option.label}</option>
          </React.Fragment>
        ))}
      </select>
    </>
  );
};

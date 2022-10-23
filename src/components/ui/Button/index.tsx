import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../../../utils';

interface IButton {
  type: ButtonHTMLAttributes<string>['type'] | undefined;
  text: string;
  handler: () => any;
  customWidth?: string;
}

export const Button: FC<IButton> = ({ text, handler, type }) => {
  return (
    <div
      onClick={handler}
      className='py-1 px-2 bg-white text-center text-black hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out rounded-md'
    >
      <button
        type={type ?? 'submit'}
        className='w-full'
      >
        {text}
      </button>
    </div>
  );
};

export const IndigoButton: FC<IButton> = ({ handler, text, type, customWidth }) => {
  return (
    <div
      className={cn(
        'py-2 px-4 text-center bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-700 transition duration-300 ease-in-out rounded-md',
        customWidth ?? 'w-40'
      )}
      onClick={handler}
    >
      <button
        type={type ?? 'submit'}
        className='w-full'
      >
        {text}
      </button>
    </div>
  );
};

export const GreenButton: FC<IButton> = ({ handler, text, type, customWidth }) => {
  return (
    <div
      className={cn(
        'py-2 px-4 text-center bg-emerald-500 text-white hover:cursor-pointer hover:bg-indigo-600 transition duration-300 ease-in-out rounded-md',
        customWidth ?? 'w-40'
      )}
      onClick={handler}
    >
      <button
        type={type ?? 'submit'}
        className='w-full'
      >
        {text}
      </button>
    </div>
  );
};

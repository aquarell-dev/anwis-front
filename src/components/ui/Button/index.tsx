import { ButtonHTMLAttributes, FC } from 'react';

interface IButton {
  type: ButtonHTMLAttributes<string>["type"] | undefined;
  text: string;
  handler: () => any;
}

export const Button: FC<IButton> = ({ text, handler, type }) => {
  return (
    <div className='py-1 px-2 bg-white text-center text-black hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out rounded-md'>
      <button
        type={type ?? 'submit'}
        onClick={handler}
      >
        {text}
      </button>
    </div>
  );
};

export const IndigoButton: FC<IButton> = ({ handler, text, type }) => {
  return (
    <div className='py-2 px-4 w-40 text-center bg-indigo-600 text-white hover:cursor-pointer hover:bg-indigo-700 transition duration-300 ease-in-out rounded-md'>
      <button
        type={type ?? 'submit'}
        onClick={handler}
      >
        {text}
      </button>
    </div>
  );
};

export const GreenButton: FC<IButton> = ({ handler, text, type }) => {
  return (
    <div className='py-2 px-4 w-40 text-center bg-emerald-500 text-white hover:cursor-pointer hover:bg-indigo-600 transition duration-300 ease-in-out rounded-md'>
      <button
        type={type ?? 'submit'}
        onClick={handler}
      >
        {text}
      </button>
    </div>
  );
};

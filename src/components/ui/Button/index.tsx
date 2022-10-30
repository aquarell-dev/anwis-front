import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../../../utils';

interface IButton {
  type: ButtonHTMLAttributes<string>['type'] | undefined;
  text: string;
  handler: () => any;
  customWidth?: string;
  customColors?: string;
}

export const Button: FC<IButton> = ({ text, handler, type, customWidth, customColors }) => {
  return (
    <div
      onClick={handler}
      className={cn(
        'py-2 px-4 text-center text-white hover:cursor-pointer transition duration-300 ease-in-out rounded-md',
        customWidth ?? 'w-40',
        customColors ?? 'bg-gray-600 hover:bg-gray-700'
      )}
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
    <Button
      type={type}
      text={text}
      handler={handler}
      customWidth={customWidth}
      customColors={'bg-indigo-600 hover:bg-indigo-700'}
    />
  );
};

export const GreenButton: FC<IButton> = ({ handler, text, type, customWidth }) => {
  return (
    <Button
      type={type}
      text={text}
      handler={handler}
      customWidth={customWidth}
      customColors={'bg-emerald-500 hover:bg-indigo-600'}
    />
  );
};

export const RedButton: FC<IButton> = ({ handler, text, type, customWidth }) => {
  return (
    <Button
      type={type}
      text={text}
      handler={handler}
      customWidth={customWidth}
      customColors={'bg-red-600 hover:bg-orange-700'}
    />
  );
};

import { ButtonHTMLAttributes, ChangeEvent, FC, ReactNode, useRef } from 'react';
import { cn } from '../../../utils';
import { SetState } from '../../../utils/types';
import { SpinnerComponent } from 'react-element-spinner';
import Loader from '../Loader';

interface IButton {
  type: ButtonHTMLAttributes<string>['type'] | undefined;
  text: string;
  handler: () => any;
  customWidth?: string;
  customColors?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button: FC<IButton> = ({ children, text, handler, type, customWidth, customColors, icon }) => {
  return (
    <div
      onClick={handler}
      className={cn(
        'py-2 px-4 text-center flex items-center justify-center space-x-2 text-white hover:cursor-pointer transition duration-300 ease-in-out rounded-md',
        customWidth ?? 'w-40',
        customColors ?? 'bg-gray-600 hover:bg-gray-700'
      )}
    >
      {icon}
      <button
        type={type ?? 'submit'}
      >
        {children ? children : text}
      </button>
    </div>
  );
};

type FileButton =
  { setFiles?: SetState<FileList | null>, multiple?: boolean, text?: string, accept?: string | undefined; onChange?: (e: ChangeEvent<HTMLInputElement>) => void }
  & Omit<IButton, 'type' | 'text' | 'handler'>

export const FileButton: FC<FileButton> = props => {
  const hiddenInput = useRef<HTMLInputElement | null>(null);

  const { setFiles, multiple, text, accept, onChange,  ...button } = props;

  return (
    <>
      <IndigoButton
        type='button'
        text={text ?? 'Загрузить файл'}
        handler={() => hiddenInput.current?.click()}
        {...button}
      />
      <input
        type="file"
        ref={hiddenInput}
        onChange={onChange ? e => onChange(e) : e => setFiles && setFiles(e.target.files)}
        style={{ display: 'none' }}
        multiple={multiple ?? false}
        accept={accept}
      />
    </>
  );
};

export const IndigoButton: FC<IButton> = props => {
  return (
    <Button
      {...props}
      customColors={'bg-indigo-600 hover:bg-indigo-700'}
    />
  );
};

export const GreenButton: FC<IButton> = props => {
  return (
    <Button
      {...props}
      customColors={'bg-emerald-500 hover:bg-indigo-600'}
    />
  );
};

export const RedButton: FC<IButton> = props => {
  return (
    <Button
      {...props}
      customColors={'bg-red-600 hover:bg-orange-700'}
    />
  );
};

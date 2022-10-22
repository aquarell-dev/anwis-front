import { FC, useRef } from 'react';
import { useOutside } from '../../../hooks/useOutside';
import { ICreatePopup, IPopup } from './types';
import { GreenButton } from '../Button';
import { Input } from '../Input';


const Popup: FC<IPopup<boolean>> = ({ children, state, setState }) => {
  const ref = useRef(null);

  useOutside(ref, () => setState(false));

  return (
    <>
      {state && (
        <div
          className='fixed w-96 h-52 bg-gray-100 rounded-md shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          ref={ref}
        >
          {children}
          <div
            className='absolute cursor-pointer hover:bg-gray-100 right-0 top-0 h-6 w-6'
            onClick={() => setState(prev => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export const CreatePopup: FC<ICreatePopup> = ({ state, setState, title, handler, value, setValue, isLoading }) => {
  return (
    <Popup
      state={state}
      setState={setState}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className='p-2 text-sm font-medium'>{title}</p>
          <div className='absolute w-[80%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            <Input
              value={value}
              handler={event => setValue(event.target.value)}
              placeholder={title}
            />
            <div className="w-full mt-2">
              <GreenButton
                type={'submit'}
                customWidth={'w-full'}
                text={'Создать'}
                handler={() => handler()}
              />
            </div>
          </div>
        </>
      )}
    </Popup>
  );
};

export default Popup;
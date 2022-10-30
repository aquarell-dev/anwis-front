import React, { FC } from 'react';
import { SetState } from '../../../../../utils/types';

interface IProps<T> {
  children: React.ReactNode;
  setState: SetState<boolean>;
}

const ChoseCreateBlock: FC<IProps<boolean>> = ({ children, setState }) => {
  return (
    <>
      <div className='flex items-end space-x-2'>
        {children}
        <div className='flex items-center pb-2'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setState(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ChoseCreateBlock;
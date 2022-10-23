import { FC, PropsWithChildren } from 'react';
import { SetState } from '../../../../../utils/types';

interface IProps<T> extends PropsWithChildren {
  setState: SetState<boolean>;
}

const ChoseCreateBlock: FC<IProps<boolean>> = ({ children, setState }) => {
  return (
    <>
      <div className='flex items-center w-full justify-between space-x-4'>
        {children}
        <div className='flex items-center'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-emerald-600"
            onClick={() => setState(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ChoseCreateBlock;
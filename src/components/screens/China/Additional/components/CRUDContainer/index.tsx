import React, { FC, ReactNode, useState } from 'react';
import CreatePopup from '../CreatePopup';
import { SetState } from '../../../../../../utils/types';

type CRUDProps = {
  title: string;
  data: ReactNode;
  onCreate: () => void;
  value: string,
  setValue: SetState<string>
};

const CRUDContainer: FC<CRUDProps> = props => {
  const {
    title,
    data,
    ...popup
  } = props;

  const [creatOpen, setCreateOpen] = useState(false);

  return (
    <div className="w-[300px] sm:w-[350px] lg:w-[400px] min-h-[500px] rounded-md border px-2 py-2 border-gray-300 overflow-y-auto">
      <div className="flex items-center justify-center space-x-4 mt-2 mb-4">
        <h1 className='text-xl'>
          {title}
        </h1>
        <div
          className="w-8 h-8 bg-indigo-600 flex items-center cursor-pointer justify-center hover:bg-indigo-700 transition duration-300 ease-in-out rounded-lg"
          onClick={() => setCreateOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {data}
      </div>
      <CreatePopup {...popup} open={creatOpen} setOpen={setCreateOpen} title={title}/>
    </div>
  );
};

export default CRUDContainer;

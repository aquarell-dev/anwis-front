import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';

const QuantityTextField: FC<GridRenderEditCellParams> = props => {
  return (
    <div className='flex items-center'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        onClick={() => console.log('clickedMinus')}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 12H6"
        />
      </svg>
      <TextField />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m6-6H6"
        />
      </svg>
    </div>
  );
};

export default QuantityTextField;

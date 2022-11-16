import { FC } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import { RussianProductRow } from '../../../types';
import { columns } from './columns';

const ProductsGrid: FC<{ rows: RussianProductRow[] }> = ({ rows }) => {
  return (
    <div className='my-5'>
      <DataGrid
        rows={rows}
        autoHeight
        disableSelectionOnClick
        columns={columns}
      />
    </div>
  );
};

export default ProductsGrid;

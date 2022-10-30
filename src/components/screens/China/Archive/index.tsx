import { FC } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { useListOrdersQuery } from '../../../../features/order/orderApi';

import { orderService } from '../../../../features/order/orderServices';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'china_distributor', headerName: 'Китайский посредник', width: 150 },
  { field: 'individual_entrepreneur', headerName: 'Индивидуальный предприниматель', width: 150 },
  {
    field: 'order_for_project',
    headerName: 'Заказ под проект',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 150,
  },
];

const Archive: FC = () => {

  const { data, error, isLoading } = useListOrdersQuery(null);

  const navigate = useNavigate();

  if (error) return <p>Error</p>;

  return (
    <div className='mt-8'>
      <div className='w-full'>
        <p className='text-xl font-medium'>Заказы в архиве</p>
        <div
          style={{ height: 600, width: '100%' }}
        >
          {isLoading ? <p>Loading</p> : (
            <>
              {data && (
                <DataGrid
                  rows={orderService.formRows(data)}
                  columns={columns}
                  pageSize={2}
                  checkboxSelection={true}
                  rowsPerPageOptions={[2]}
                  onCellDoubleClick={((params) => console.log(params.id))}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;

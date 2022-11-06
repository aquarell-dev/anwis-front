import { FC } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useListOrdersQuery } from '../../../../store/api/order.api';

import { orderService } from '../../../../features/order/order.services';

import Loader from '../../../ui/Loader';

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

  if (isLoading) return <Loader isLoading={isLoading} />;

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

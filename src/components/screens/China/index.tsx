import { FC } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListOrdersQuery } from '../../../features/order/orderApi';
import { orderService } from '../../../features/order/orderServices';

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

const China: FC = () => {

  const { data, error, isLoading } = useListOrdersQuery(null);

  if (error) return <p>Error</p>;

  return (
    <div className='mt-8 flex space-x-5'>
      <div
        style={{ height: 600, width: '50%' }}
      >
        <div className="flex items-center space-x-4 mb-3">
          <p className='font-medium text-xl'>Список заказов</p>
          <div className='flex items-center bg-gray-100 px-2 rounded-sm shadow-sm'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type='text'
              className='py-1 bg-gray-100 px-2 outline-none'
              placeholder='Поиск заказов'
            />
          </div>
        </div>
        {isLoading ? <p>Loading</p> : (
          <>
            {data && (
              <DataGrid
                rows={orderService.formRows(data)}
                columns={columns}
                pageSize={2}
                rowsPerPageOptions={[2]}
              />
            )}
          </>
        )}
      </div>
      <div>
        <p className='text-xl font-medium'>Заказы в архиве</p>
      </div>
    </div>
  );
};

export default China;

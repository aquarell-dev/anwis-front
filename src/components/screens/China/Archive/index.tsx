import Link from 'next/link'
import { FC } from 'react'

import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useListArchiveOrdersQuery } from '../../../../store/api/order.api'

import { orderService } from '../../../../features/order/order.services'

import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'china_distributor', headerName: 'Китайский посредник', width: 150 },
  { field: 'individual_entrepreneur', headerName: 'Индивидуальный предприниматель', width: 150 },
  {
    field: 'order_for_project',
    headerName: 'Заказ под проект',
    width: 150
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 150
  },
  {
    field: 'redirect',
    headerName: 'Перейти',
    width: 150,
    renderCell: params => (
      <Link href={`../../china/orders/${params.row.id}/`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
          />
        </svg>
      </Link>
    )
  }
]

const Archive: FC = () => {
  const { data, error, isLoading } = useListArchiveOrdersQuery(null)

  if (isLoading) return <Loader isLoading={isLoading} />

  if (error) return <p>Error</p>

  return (
    <ContentContainer>
      <div className='w-full'>
        <p className='text-xl font-medium'>Заказы в архиве</p>
        <div style={{ height: 600, width: '100%' }}>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <>
              {data && (
                <DataGrid
                  rows={orderService.formRows(data)}
                  columns={columns}
                  pageSize={2}
                  checkboxSelection={true}
                  rowsPerPageOptions={[2]}
                  onCellDoubleClick={params => console.log(params.id)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </ContentContainer>
  )
}

export default Archive

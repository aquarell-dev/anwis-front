import React, { FC } from 'react';
import { IProduct } from '../../../../features/order/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FancyInput } from '../../../ui/Input';
import { GreenButton, IndigoButton } from '../../../ui/Button';
import useProducts from './hooks/useProducts';
import { cn } from '../../../../utils';

type Fields = GridColDef & { field: keyof IProduct }

const columns: Fields[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'photo',
    headerName: 'Фотография',
    width: 150,
    renderCell: (params) => <img
      alt={'Фото'}
      src={params.value}
      className='w-12 h-12 flex items-center justify-center'
    />
  },
  { field: 'title', headerName: 'Название', width: 180 },
  { field: 'article', headerName: 'Артикул', width: 180 },
];

const Products: FC = () => {
  const {
    products,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
    categories,
    isLoading,
    error
  } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error...</p>;

  return (
    <div className='my-6'>
      <div className="my-2 flex items-center space-x-4">
        <IndigoButton
          type={'button'}
          text={'Создать'}
          handler={() => {
          }}
        />
        <FancyInput
          value={search}
          handler={(e) => setSearch(e.target.value)}
          placeholder={'Поиск продуктов'}
        />
      </div>
      {products && (
        <div className='flex space-x-4'>
          <div className="ml-2 mr-8 flex flex-col space-y-1">
            {categories && categories.map(category => (
              <div
                onClick={() => setSelectedCategory(category.category)}
                key={category.id}
                className={cn(
                  'bg-gray-100 w-full rounded-md px-2 py-1 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out',
                  selectedCategory === category.category ? 'border border-indigo-600' : ''
                )}
              >
                <p>{category.category}</p>
              </div>
            ))}
            <GreenButton
              type='button'
              text='Сбросить фильтр'
              customWidth='w-full'
              handler={() => setSelectedCategory('')}
            />
          </div>
          <DataGrid
            autoHeight
            checkboxSelection
            density={'comfortable'}
            columns={columns}
            hideFooterPagination
            disableSelectionOnClick
            rows={filteredProducts ?? products}
          />
        </div>
      )}
    </div>
  );
};

export default Products;

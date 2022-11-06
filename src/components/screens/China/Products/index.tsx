import React, { FC, ReactNode } from 'react';
import { IProduct } from '../../../../features/order/order.types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useProducts from './hooks/useProducts';
import Categories from './components/Categories';
import Navigation from './components/Navigation';
import '../../../../index.css';
import Loader from '../../../ui/Loader';

type Fields = GridColDef & { field: keyof IProduct }

const columns: Fields[] = [
  { field: 'title', headerName: 'Название', width: 180 },
  {
    field: 'photo',
    headerName: 'Фотография',
    width: 150,
    renderCell: (params) => <div className='img-wrapper'><img
      alt={'Фото'}
      src={params.value}
      className='w-12 h-12 flex items-center justify-center hover-zoom'
    />
    </div>
  },
  { field: 'article', headerName: 'Артикул', width: 180 },
  { field: 'size', headerName: 'Размер', width: 180 },
  { field: 'brand', headerName: 'Бренд', width: 180 },
  { field: 'color', headerName: 'Цвет', width: 180 },
  { field: 'id', headerName: 'ID', width: 70 },
];

const ProductsPage: FC<{
  customGrid?: ReactNode
}> = ({ customGrid }) => {
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

  if (isLoading) return <Loader isLoading={isLoading}/>;

  if (error) return <p>Error...</p>;

  return (
    <div className='my-6'>
      <Navigation
        search={search}
        setSearch={setSearch}
        categories={categories}
      />
      {products && (
        <div className='flex space-x-8'>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {customGrid ? customGrid : (
            <DataGrid
              autoHeight
              checkboxSelection
              density={'comfortable'}
              columns={columns}
              disableSelectionOnClick
              rows={filteredProducts ?? products}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

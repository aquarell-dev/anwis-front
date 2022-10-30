import React, { FC, useState } from 'react';

import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';

import { IProductFields } from './types';
import { IProduct, IProductSpecs } from '../../../../../features/order/types';

import { orderService } from '../../../../../features/order/orderServices';
import CustomToolbar from './CustomToolbar';
import { SetState } from '../../../../../utils/types';
import { TAdditional } from '../../types';


const ProductGrid: FC<{
  selectedProducts: IProductSpecs[],
  setSelectedProducts: SetState<IProductSpecs[]>,
  additional: TAdditional,
  setAdditional: SetState<TAdditional>,
}> = ({ selectedProducts, setSelectedProducts, setAdditional }) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const columns: IProductFields[] = [
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
    { field: 'quantity', headerName: 'Количество', width: 180, editable: true },
    { field: 'price_cny', headerName: 'Цена, ¥', width: 140, editable: true },
    { field: 'price_rub', headerName: 'Цена, ₽', width: 140, editable: true },
    { field: 'additional_expenses', headerName: 'Доп. затраты ₽', width: 180 },
    {
      field: 'delete', headerName: 'Убрать', width: 80, renderCell: params => <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer hover:text-gray-500 duration-300 ease-in-out"
        onClick={() => setSelectedProducts(
         selectedProducts.filter(selectedProduct => selectedProduct.product.id !== params.id)
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    }
  ];

  const rows = orderService.formProductRows(selectedProducts);

  return (
    <DataGrid
      autoHeight
      checkboxSelection
      density={'comfortable'}
      columns={columns}
      hideFooterPagination
      hideFooter
      disableSelectionOnClick
      rows={rows}
      components={{
        Toolbar: CustomToolbar
      }}
      componentsProps={{
        toolbar: {
          selectionModel,
          selectedProducts,
          setSelectedProducts
        }
      }}
      onSelectionModelChange={selectionModel => setSelectionModel(selectionModel)}
      selectionModel={selectionModel}
      onCellEditCommit={(params => {
        const { id, field, value } = params;

        setAdditional(prev => ({
          ...prev,
          indicator: !prev.indicator
        }));

        const product = selectedProducts.find(product => product.product.id === id);

        if (!product) return;

        const newProduct = Object.assign({}, product);

        if (field === 'product') return;

        // @ts-ignore
        newProduct[field as keyof IProductSpecs] = parseInt(value);

        setSelectedProducts(selectedProducts.map(selectedProduct => selectedProduct.product.id === id ?
          newProduct
          :
          selectedProduct));
      })}
    />
  );
};

export default ProductGrid;
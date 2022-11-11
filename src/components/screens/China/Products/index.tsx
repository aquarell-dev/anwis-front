import React, { FC, ReactNode, useState } from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import useProducts from './hooks/useProducts';
import Categories from './components/Categories';
import Navigation from './components/Navigation';
import '../../../../index.css';
import Loader from '../../../ui/Loader';
import { Fields, fields } from './fields';
import { IProduct } from '../../../../features/order/order.types';
import MutateProductPopup from './components/CreateProductPopup';
import { useCreateProductMutation, useDeleteProductMutation } from '../../../../store/api/product.api';
import DeletePopup from '../components/DeletePopup';
import useNotifications from '../../../../hooks/useNotifications';
import CreateSameProduct from './components/CreateSameProduct';
import Toolbar from './components/Toolbar';


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

  const [deleteProduct, _] = useDeleteProductMutation();
  const [copyProduct, copyResult] = useCreateProductMutation();
  const { notifyError, notifySuccess } = useNotifications();

  const [productChangeOpen, setProductChangeOpen] = useState(false);
  const [productDeleteOpen, setProductDeleteOpen] = useState(false);
  const [createSameOpen, setCreateSameOpen] = useState(false);
  const [size, setSize] = useState('');

  const [productUpToChange, setProductUpToChange] = useState<IProduct | null>(null);
  const [productUpToDeletion, setProductUpToDeletion] = useState<{ content: string; id: number } | null>(null);
  const [copyProductId, setCopyProductId] = useState<number | null>(null);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const columns: Fields[] = [...fields,
    {
      field: 'createalike',
      headerName: 'Копировать',
      width: 100,
      renderCell: params =>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-slate-600 transition duration-300 ease-in-out"
          onClick={() => {
            setCopyProductId(params.row.id);
            setCreateSameOpen(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>
    },
    {
      field: 'update',
      headerName: 'Изменить',
      width: 100,
      renderCell: params =>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-slate-600 transition duration-300 ease-in-out"
          onClick={() => {
            setProductUpToChange(products?.find(p => p.id === params.row.id) ?? null);
            setProductChangeOpen(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
    },
    {
      field: 'delete', headerName: 'Удалить', width: 100, renderCell: params =>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-slate-600 transition duration-300 ease-in-out"
          onClick={() => {
            setProductUpToDeletion({ id: params.row.id, content: params.row.title });
            setProductDeleteOpen(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
          />
        </svg>
    }];

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
              components={{
                Toolbar: Toolbar
              }}
              componentsProps={{
                toolbar: { selectionModel }
              }}
              onSelectionModelChange={(newModel) => setSelectionModel(newModel)}
              disableSelectionOnClick
              rows={filteredProducts ?? products}
            />
          )}
        </div>
      )}
      <MutateProductPopup
        open={productChangeOpen}
        setOpen={setProductChangeOpen}
        categories={categories}
        product={productUpToChange}
      />
      <DeletePopup
        open={productDeleteOpen}
        setOpen={setProductDeleteOpen}
        content={productUpToDeletion?.content ?? ''}
        onDelete={() => {
          productUpToDeletion && deleteProduct(productUpToDeletion.id)
            .unwrap()
            .then(() => notifySuccess('Товар был удален'))
            .catch(() => notifyError('Товар не был удален'))
            .finally(() => setProductDeleteOpen(false));
        }}
      />
      <CreateSameProduct
        onCommit={() => {
          const product = products?.find(p => p.id === copyProductId);

          if (!product) return;

          copyProduct({
            ...product,
            category: categories?.find(category => category.category === product.category)?.id,
            size: size,
            photo: product.photo_id
          }).unwrap()
            .then(() => notifySuccess('Товар был скопирован'))
            .catch(() => notifyError('Товар не был скопирован'))
            .finally(() => setCreateSameOpen(false));
        }}
        open={createSameOpen}
        setOpen={setCreateSameOpen}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};

export default ProductsPage;

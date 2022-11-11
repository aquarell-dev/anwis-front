import React, { FC, ReactNode } from 'react';
import useProducts from './hooks/useProducts';
import Categories from './components/Categories';
import Navigation from './components/Navigation';
import '../../../../index.css';
import Loader from '../../../ui/Loader';
import MutateProductPopup from './components/CreateProductPopup';
import DeletePopup from '../components/DeletePopup';
import CreateSameProduct from './components/CreateSameProduct';
import DefaultProductGrid from './components/DefaultProductGrid';
import useProductMutations from './hooks/useProductMutations';


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

  const { popups, values, onDelete, onCommit } = useProductMutations(products, categories);

  const {
    productChangeOpen,
    productDeleteOpen,
    setProductDeleteOpen,
    setProductChangeOpen,
    createSameOpen,
    setCreateSameOpen
  } = popups;

  const {productUpToChange, productUpToDeletion, size, setSize} = values;

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
            <DefaultProductGrid
              values={values}
              popups={popups}
              products={products}
              filteredProducts={filteredProducts}
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
        onDelete={onDelete}
      />
      <CreateSameProduct
        onCommit={onCommit}
        open={createSameOpen}
        setOpen={setCreateSameOpen}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};

export default ProductsPage;

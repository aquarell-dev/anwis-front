import React, { FC, useState } from 'react';

import { IndigoButton } from '../../../../ui/Button';
import ProductSearch from './ProductSearch';

import { IProduct, IProductSpecs } from '../../../../../features/order/types';
import { SetState } from '../../../../../utils/types';
import { AddProductFromDictionaryPopup } from '../../../../ui/Popup';
import { useListCategoriesQuery } from '../../../../../features/order/orderApi';

import ProductGrid from './ProductGrid';
import { TAdditional } from '../../types';


interface IProductsProps {
  products: IProduct[];
  selectedProducts: IProductSpecs[];
  setSelectedProducts: SetState<IProductSpecs[]>;
  additional: TAdditional;
  setAdditional: SetState<TAdditional>
}

const Products: FC<IProductsProps> = ({
                                        products,
                                        selectedProducts,
                                        setSelectedProducts,
                                        additional,
                                        setAdditional
                                      }) => {
  const handleOnSelect = (item: IProduct) => setSelectedProducts(prev => [{
    quantity: 0,
    price_cny: 0,
    price_rub: 0,
    cny_to_rub_course: 0,
    additional_expenses: 0,
    product: item
  }, ...prev]);

  const [addProductsFromDictionaryOpen, setAddProductsFromDictionaryOpen] = useState(false);
  const { data: categories, isLoading, error } = useListCategoriesQuery(null);

  return (
    <>
      <div className="w-full border border-gray-500 mt-12"/>
      <div className="flex items-center space-x-3">
        <div style={{ width: '30%', zIndex: '30' }}>
          <ProductSearch
            products={products}
            handleOnSelect={handleOnSelect}
          />
        </div>
        <IndigoButton
          customWidth='w-64'
          type={'button'}
          text={'Создать новый товар'}
          handler={() => {
          }}
        />
        <IndigoButton
          customWidth='w-64'
          type={'button'}
          text={'Добавить из справочника'}
          handler={() => setAddProductsFromDictionaryOpen(true)}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <ProductGrid
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setAdditional={setAdditional}
          additional={additional}
        />
      </div>
      <AddProductFromDictionaryPopup
        state={addProductsFromDictionaryOpen}
        setState={setAddProductsFromDictionaryOpen}
        isLoading={isLoading}
        categories={categories}
        error={error}
        products={products}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <div className="w-full border border-gray-500 mb-24"/>
    </>
  );
};

export default Products;
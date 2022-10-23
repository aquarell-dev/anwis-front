import React, { FC } from 'react';

import { IndigoButton } from '../../../../ui/Button';
import ProductSearch from './ProductSearch';

import { IProduct } from '../../../../../features/order/types';
import { SetState } from '../../../../../utils/types';
import SelectedProduct from './SelectedProduct';


interface IProductsProps {
  products: IProduct[];
  selectedProducts: IProduct[];
  setSelectedProducts: SetState<IProduct[]>;
}


const Products: FC<IProductsProps> = ({ products, selectedProducts, setSelectedProducts }) => {
  const handleOnSelect = (item: IProduct) => setSelectedProducts(prev => [item, ...prev]);

  return (
    <>
      <div className="flex items-center space-x-3">
        <div style={{ width: '30%' }}>
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
          handler={() => {
          }}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {selectedProducts.map(product => (
          <React.Fragment key={product.id}>
            <SelectedProduct product={product} setSelectedProducts={setSelectedProducts} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Products;
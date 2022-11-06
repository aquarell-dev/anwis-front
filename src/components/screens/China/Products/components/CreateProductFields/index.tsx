import React, { FC } from 'react';

import { FancyInput } from '../../../../../ui/Input';

import { ICreateProduct } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';


const CreateProductFields: FC<{ product: ICreateProduct, setProduct: SetState<ICreateProduct> }> = ({ product, setProduct }) => {
  return (
    <div className="grid grid-cols-2 gap-8 mb-2 w-full">
      <FancyInput
        value={product.title}
        handler={e => setProduct(prev => ({ ...prev, title: e.target.value }))}
        placeholder='Название'
        showLabel
      />
      <FancyInput
        value={product.color}
        handler={e => setProduct(prev => ({ ...prev, color: e.target.value }))}
        placeholder='Цвет'
        showLabel
      />
      <FancyInput
        value={product.brand}
        handler={e => setProduct(prev => ({ ...prev, brand: e.target.value }))}
        placeholder='Бренд'
        showLabel
      />
      <FancyInput
        value={product.size}
        handler={e => setProduct(prev => ({ ...prev, size: e.target.value }))}
        placeholder='Размер'
        showLabel
      />
      <FancyInput
        value={product.article}
        type='text'
        handler={e => setProduct(prev => ({ ...prev, article: e.target.value }))}
        placeholder='Артикул поставщика'
        showLabel
      />
      <FancyInput
        value={product.url}
        type='text'
        handler={e => setProduct(prev => ({ ...prev, url: e.target.value }))}
        placeholder='Ссылка'
        showLabel
      />
    </div>
  )
};

export default CreateProductFields;
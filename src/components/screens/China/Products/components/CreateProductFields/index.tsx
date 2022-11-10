import React, { FC, useState } from 'react';

import { FancyInput } from '../../../../../ui/Input';

import { ICreateProduct } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';


const CreateProductFields: FC<{
  product: ICreateProduct,
  setProduct: SetState<ICreateProduct>
}> = ({ product, setProduct }) => {
  const [noSize, setNoSize] = useState(false);

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
      <div className='flex items-end space-x-1'>
        <FancyInput
          value={product.size}
          handler={e => setProduct(prev => ({ ...prev, size: e.target.value }))}
          placeholder='Размер'
          showLabel
          customWidth='w-60'
          disabled={noSize}
        />
        <div className='flex items-center space-x-1'>
          <p className='text-sm'>Без размера</p>
          <input
            type='checkbox'
            checked={noSize}
            onChange={() => {
              setProduct(prev => ({ ...prev, size: '-' }));
              setNoSize(prev => !prev);
            }}
            className='border border-slate-800 outline-none cursor-pointer'
          />
        </div>
      </div>
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
  );
};

export default CreateProductFields;
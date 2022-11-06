import React, { FC } from 'react';

import { cn } from '../../../../../../utils';

import { GreenButton } from '../../../../../ui/Button';
import { ICategory } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';


interface CategoriesProps {
  categories: ICategory[] | undefined;
  selectedCategory: string;
  setSelectedCategory: SetState<string>;
}


const Categories: FC<CategoriesProps> = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
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
  )
};

export default Categories;
import React, { FC, useEffect, useState } from 'react';

import { cn } from '../../../../../../utils';

import { GreenButton } from '../../../../../ui/Button';
import { ICategory } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';
import DeletePopup from '../../../components/DeletePopup';
import useMutateCategory from '../../hooks/useMutateCategory';
import ChangePopup from '../../../components/ChangePopup';


interface CategoriesProps {
  categories: ICategory[] | undefined;
  selectedCategory: string;
  setSelectedCategory: SetState<string>;
}


const Categories: FC<CategoriesProps> = ({ categories, setSelectedCategory, selectedCategory }) => {
  const [changeOpen, setChangeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
  const [changeCategoryValue, setChangeCategoryValue] = useState<string>('');

  const [updateCategory, deleteCategory] = useMutateCategory();

  useEffect(() => {
    if (!deleteOpen && !changeOpen) {
      setCurrentCategory(null);
      setChangeCategoryValue('');
    }
  }, [changeOpen, deleteOpen]);

  return (
    <div className="ml-2 mr-8 flex flex-col space-y-1">
      {categories && categories.map(category => (
        <div
          onClick={() => setSelectedCategory(category.category)}
          key={category.id}
          className={cn(
            'bg-gray-100 w-full flex items-center space-x-4 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out',
            selectedCategory === category.category ? 'border border-indigo-600' : 'border border-transparent'
          )}
        >
          <p>{category.category}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 ease-in-out transition"
            onClick={() => {
              setChangeOpen(true);
              setCurrentCategory(category);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 ease-in-out transition"
            onClick={() => {
              setDeleteOpen(true);
              setCurrentCategory(category);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </div>
      ))}
      <GreenButton
        type='button'
        text='Сбросить фильтр'
        customWidth='w-full'
        handler={() => setSelectedCategory('')}
      />
      <ChangePopup
        open={changeOpen}
        setOpen={setChangeOpen}
        content={currentCategory ? currentCategory?.category : ''}
        onUpdate={() => currentCategory && updateCategory({
          ...currentCategory,
          category: changeCategoryValue
        }, () => setChangeOpen(false))}
        value={changeCategoryValue}
        setValue={setChangeCategoryValue}
      />
      <DeletePopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        content={currentCategory ? currentCategory?.category : ''}
        onDelete={() => currentCategory && deleteCategory(currentCategory, () => setDeleteOpen(false))}
      />
    </div>
  );
};

export default Categories;
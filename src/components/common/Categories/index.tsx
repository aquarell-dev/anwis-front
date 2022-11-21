import { FC } from 'react'

import { cn } from '../../../utils'
import { SetState } from '../../../utils/types'
import { GreenButton } from '../../ui/Button'
import ConfirmationPopup from '../../ui/ConfirmationPopup'
import MutatePopup from '../../ui/MutatePopup'

interface CategoriesProps {
  categories: { id: number; category: string }[] | undefined
  selectedCategory: string
  setSelectedCategory: SetState<string>
  currentCategory: { id: number; category: string } | null
  setCurrentCategory: SetState<{ id: number; category: string } | null>
  changeCategoryValue: string
  setChangeCategoryValue: SetState<string>
  changeOpen: boolean
  setChangeOpen: SetState<boolean>
  deleteOpen: boolean
  setDeleteOpen: SetState<boolean>
  deleteCategory: () => void
  updateCategory: () => void
}

const Categories: FC<CategoriesProps> = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  deleteCategory,
  updateCategory,
  currentCategory,
  setCurrentCategory,
  changeCategoryValue,
  setChangeCategoryValue,
  changeOpen,
  setChangeOpen,
  deleteOpen,
  setDeleteOpen
}) => {
  return (
    <div className='ml-2 mr-8 flex flex-col space-y-1'>
      {categories &&
        categories.map(category => (
          <div
            onClick={() => setSelectedCategory(category.category)}
            key={category.id}
            className={cn(
              'bg-gray-100 w-full flex items-center space-x-4 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out',
              selectedCategory === category.category
                ? 'border border-indigo-600'
                : 'border border-transparent'
            )}
          >
            <p>{category.category}</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 ease-in-out transition'
              onClick={() => {
                setCurrentCategory(category)
                setChangeCategoryValue(category.category)
                setChangeOpen(true)
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 ease-in-out transition'
              onClick={() => {
                setDeleteOpen(true)
                setCurrentCategory(category)
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z'
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
      <MutatePopup
        open={changeOpen}
        setOpen={setChangeOpen}
        content={currentCategory ? currentCategory?.category : ''}
        onMutate={updateCategory}
        closeOnEnd
        clearOnClose
        value={changeCategoryValue}
        setValue={setChangeCategoryValue}
        placeholder='Категория'
      />
      <ConfirmationPopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        deleteQuestion={`Вы уверены, что хотите удалить "${
          currentCategory ? currentCategory?.category : ''
        }"`}
        onConfirm={deleteCategory}
      />
    </div>
  )
}

export default Categories

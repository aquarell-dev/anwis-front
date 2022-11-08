import { FC, useRef, useState } from 'react';
import { useOutside } from '../../../hooks/useOutside';
import { IAddProductPopup, ICreatePopup, IPopup } from './types';
import { GreenButton, IndigoButton } from '../Button';
import { Input } from '../Input';
import { cn } from '../../../utils';
import ProductSearch from '../../screens/China/Order/components/ProductSearch';


const Popup: FC<IPopup<boolean>> = ({ children, state, setState, width, height, bgColor }) => {
  const ref = useRef(null);

  useOutside(ref, () => setState(false));

  return (
    <>
      {state && (
        <div
          className={cn(
            'fixed z-[100] rounded-md shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            width ?? 'w-96', height ?? 'h-52', bgColor ?? 'bg-gray-200'
          )}
          ref={ref}
        >
          {children}
          <div
            className='absolute m-2 cursor-pointer hover:bg-gray-100 right-0 top-0 h-6 w-6'
            onClick={() => setState(prev => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-slate-700 duration-300 transition ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export const CreatePopup: FC<ICreatePopup> = ({ state, setState, title, handler, value, setValue, isLoading }) => {
  return (
    <Popup
      state={state}
      setState={setState}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className='p-2 text-sm font-medium'>{title}</p>
          <div className='absolute w-[80%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            <Input
              value={value}
              handler={event => setValue(event.target.value)}
              placeholder={title}
            />
            <div className="w-full mt-2">
              <GreenButton
                type={'submit'}
                customWidth={'w-full'}
                text={'Создать'}
                handler={() => handler()}
              />
            </div>
          </div>
        </>
      )}
    </Popup>
  );
};

export const AddProductFromDictionaryPopup: FC<IAddProductPopup> = ({
                                                                      setState,
                                                                      state,
                                                                      isLoading,
                                                                      categories,
                                                                      error,
                                                                      products,
                                                                      selectedProducts,
                                                                      setSelectedProducts
                                                                    }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  if (error) return <p>Error</p>;

  return (
    <Popup
      state={state}
      setState={setState}
      width={'w-[80%]'}
      height={'h-[70%]'}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="absolute bottom-0 right-0 my-1 mx-2">
            <IndigoButton
              type={'button'}
              text={'Готово'}
              handler={() => setState(false)}
            />
          </div>
          <div className="flex space-x-12 items-start mx-4 my-2">
            <div className="overflow-y-auto">
              <p className='font-medium text-xl'>Категории</p>
              <div className="flex flex-col space-y-1.5 mt-8">
                {categories ? categories.map(category => (
                  <p
                    className='underline hover:text-gray-600 duration-300 ease-in-out transition cursor-pointer'
                    key={category.id}
                    onClick={() => setFilteredProducts(products.filter(product => product.category === category.category))}
                  >
                    {category.category}
                  </p>
                )) : <p>Error</p>}
                <p
                  className='hover:text-gray-600 duration-300 ease-in-out transition cursor-pointer'
                  onClick={() => setFilteredProducts(products)}
                >
                  Сбросить фильтры
                </p>
              </div>
            </div>
            <div className="w-[80%]">
              <div className="w-50%">
                <ProductSearch
                  products={products}
                  handleOnSelect={() => {
                  }}
                  selectedProducts={selectedProducts}
                />
              </div>
              <div className="mt-2 w-full grid grid-cols-5 gap-x-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className='flex space-x-4 bg-gray-200 hover:bg-gray-300 duration-300 transition ease-in-out cursor-pointer rounded-md items-center px-2 py-1'
                    onClick={() => setSelectedProducts(prev => [{
                      quantity: 0,
                      price_rub: 0,
                      price_cny: 0,
                      cny_to_rub_course: 0,
                      additional_expenses: 0,
                      product
                    }, ...prev])}
                  >
                    <img
                      src={product.photo}
                      alt={product.title}
                      className='w-8 h-8 object-cover my-1'
                    />
                    <p>{product.article}, {product.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Popup>
  );
};

export default Popup;
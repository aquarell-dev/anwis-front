import { FC } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { IProduct } from '../../../../../features/order/types';
import { IProductSearchProps } from './types';

const ProductSearch: FC<IProductSearchProps> = ({ products, handleOnSelect }) => {
  const formatResult = (item: IProduct) => {
    return (
      <div className='flex items-center space-x-5'>
        <img
          src={item.photo}
          alt={item.title}
          className='w-8 h-8 object-cover my-1'
        />
        <span className='block text-left'>{item.article}, {item.title}</span>
      </div>
    );
  };

  return (
    <ReactSearchAutocomplete
      items={products}
      onSelect={handleOnSelect}
      autoFocus
      fuseOptions={{
        keys: [
          'title', 'article'
        ]
      }}
      resultStringKeyName="title"
      placeholder='Поиск товаров'
      styling={{
        backgroundColor: '#F3F4F6',
        height: '44px',
        border: '1px solid #dfe1e5',
        borderRadius: '6px',
        color: '#212121',
        fontSize: '16px',
        fontFamily: 'Montserrat',
        iconColor: 'grey',
        lineColor: 'rgb(232, 234, 237)',
        placeholderColor: 'grey',
        clearIconMargin: '3px 14px 0 0',
        searchIconMargin: '0 0 0 16px'
      }}
      formatResult={formatResult}
      showNoResultsText={'Не найдено результатов'}
    />
  )
};

export default ProductSearch;
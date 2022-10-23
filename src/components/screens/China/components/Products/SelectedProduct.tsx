import { FC, useState } from 'react';
import { IProduct } from '../../../../../features/order/types';
import { SetState } from '../../../../../utils/types';
import { Input } from '../../../../ui/Input';

const SelectedProduct: FC<{ product: IProduct, setSelectedProducts: SetState<IProduct[]> }> = ({
                                                                                                 product,
                                                                                                 setSelectedProducts
                                                                                               }) => {
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');

  return (
    <div className='w-full bg-gray-100 px-4 py-2 flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <img
          src={product.photo}
          alt={product.title}
          className='w-8 h-8 object-cover'
        />
        <p className='font-medium'>{product.article}</p>
        <p>{product.title}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-32">
          <Input
            type={'number'}
            value={price}
            handler={e => setPrice(e.target.value)}
            placeholder={'Цена'}
          />
        </div>
        <div className="w-32">
          <Input
            type={'number'}
            value={course}
            handler={e => setCourse(e.target.value)}
            placeholder={'Курс'}
          />
        </div>
        <div className="w-32">
          <Input
            type={'string'}
            value={(price && course) ? parseInt(price) * parseInt(course) : ''}
            additionalStyles='bg-gray-200 disabled'
            handler={() => {}}
            disabled={true}
            placeholder={'В RUB'}
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-gray-500 duration-300 ease-in-out"
          onClick={() => setSelectedProducts(prev => prev.filter(p => p.id !== product.id))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectedProduct;
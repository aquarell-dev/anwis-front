import { FC } from 'react';
import { IOrder } from '../../../../../../features/order/order.types';

const BottomControls: FC<{ order?: IOrder, register: any }> = ({ order, register }) => {
  return (
    <div className='flex items-end space-x-8'>
      <div className='w-1/6'>
        <p>Комментарий к заказу</p>
        <textarea
          className={'bg-gray-100 w-full h-6'}
          defaultValue={order?.commentary} {...register('commentary')} />
      </div>
      <div className="w-1/6">
        <p>Прикрепить файл</p>
        <input
          className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
          multiple
        />
      </div>
      <div className='flex items-center space-x-3 w-1/6'>
        <p className='text-xl'>Черновик</p>
        <input
          type='checkbox'
          multiple={true}
          {...register('draft')}
          className='mx-3'
          defaultChecked={order?.draft}
        />
      </div>
    </div>
  );
};

export default BottomControls;
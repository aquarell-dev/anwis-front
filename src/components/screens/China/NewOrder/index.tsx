import { FC } from 'react';
import OrderForm from '../components/OrderForm';

const NewOrder: FC = () => {
  const date = new Date();
  const currentDate = `${date.getHours()}:${date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  return (
    <div className='mx-4 my-6'>
      <h1 className='text-3xl mb-3'>Заказ поставщику в <span className='underline text-indigo-600'>Китай</span> от {currentDate}</h1>
      <OrderForm />
    </div>
  );
};

export default NewOrder;
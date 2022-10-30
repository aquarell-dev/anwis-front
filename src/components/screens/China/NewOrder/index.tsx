import { FC } from 'react';
import OrderForm from '../components/OrderForm';
import { useCreateOrderMutation } from '../../../../features/order/orderApi';

const NewOrder: FC = () => {
  const [createOrder, { isLoading: createOrderLoading }] = useCreateOrderMutation();

  return <OrderForm mutation={createOrder}/>;
};

export default NewOrder;
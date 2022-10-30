import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { useGetOrderByIdQuery, useUpdateOrderByIdMutation } from '../../../../features/order/orderApi';

import OrderForm from '../components/OrderForm';

const ExistingOrder: FC = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetOrderByIdQuery(id);
  const [updateOrder, _] = useUpdateOrderByIdMutation();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>error...</p>;

  if (!id) return <p>error</p>;

  return (
    <OrderForm
      order={data}
      mutation={updateOrder}
    />
  );
};

export default ExistingOrder;
import { FC } from 'react';

import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../../../store/api/order.api';

import OrderForm from '../components/OrderForm';
import Loader from '../../../../ui/Loader';


const ExistingOrder: FC = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) return <Loader isLoading={isLoading}/>;

  if (error) return <p>error...</p>;

  if (!id) return <p>error</p>;

  return (
    <OrderForm order={data}/>
  );
};

export default ExistingOrder;
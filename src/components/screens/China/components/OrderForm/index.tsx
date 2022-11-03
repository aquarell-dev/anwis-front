import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import useOrderData from '../../hooks/useOrderData';

import FormControls from '../FormControls';
import Products from '../Products';
import BottomControls from './BottomControls';
import Notification from './Notification';
import AdditionalExpenses from './AdditionalExpenses';
import ButtonGroup from './ButtonGroup';

import { IOrderForm } from '../../types';
import { Mutation } from '../../../../../utils/types';
import { ICreateUpdateOrder, IOrder, TStatuses } from '../../../../../features/order/types';

import { orderService } from '../../../../../features/order/orderServices';
import ReadyOrderDate from './ReadyOrderDate';
import CargoShipInfo from './CargoShipInfo';
import useStatusShow from '../../hooks/useStatusShow';


const OrderForm: FC<{ order?: IOrder; mutation: Mutation<ICreateUpdateOrder> }> = ({ order, mutation }) => {
  const {
    chinaDistributors,
    orderForProjects,
    statuses,
    products,
    isLoading,
    isError,
    additional,
    setAdditional,
    selectedProducts,
    setSelectedProducts
  } = useOrderData(order);

  const { register, handleSubmit, formState: { errors }, control } = useForm<IOrderForm>();

  const [selectedStatus, setSelectedStatus] = useState<TStatuses>(order ? order.status.status : 'Ожидает заказа в Китае');
  const show = useStatusShow(statuses, selectedStatus);

  const date = orderService.getStringDate(order);

  const onSubmit = (data: IOrderForm) => orderService.submitForm(
    data, mutation, 1, selectedProducts, order ? order.id : undefined
  );

  if (isLoading) return <p>loading</p>;

  if (isError) return <p>error</p>;

  return (
    <div className='mx-4 my-6'>
      {chinaDistributors && orderForProjects && statuses && products && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
        >
          <h1 className='text-3xl mb-3'>Заказ {order && `№${order.custom_id}`} поставщику
            в <span className='underline text-indigo-600'>Китай</span> от {date}</h1>
          <FormControls
            errors={errors}
            register={register}
            orderForProjects={orderForProjects}
            chinaDistributors={chinaDistributors}
            statuses={statuses}
            order={order}
            control={control}
            setSelectedStatus={setSelectedStatus}
          />
          {
            show('Отправлен поставщику для просчета') && (
              <AdditionalExpenses
                additional={additional}
                setAdditional={setAdditional}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                order={order}
                statuses={statuses}
              />
            )
          }
          {show('Заказ оформлен') && <ReadyOrderDate order={order}/>}
          {show('Отправлен из Китая') && <CargoShipInfo
            order={order}
            statuses={statuses}
          />}
          <Products
            products={products}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            additional={additional}
            setAdditional={setAdditional}
            order={order}
          />
          <BottomControls
            register={register}
            order={order}
          />
          <Notification
            order={order}
            control={control}
          />
          <ButtonGroup order={order}/>
        </form>
      )}
    </div>
  );
};

export default OrderForm;
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import useOrderData from '../../hooks/useOrderData';
import useSubmitOrder from '../../hooks/useSubmitOrder';
import useStatusShow from '../../hooks/useStatusShow';
import useStatusChange from '../../hooks/useStatusChange';

import FormControls from '../FormControls';
import Products from '../Products';
import BottomControls from '../BottomControls';
import Notification from '../Notification';
import AdditionalExpenses from '../AdditionalExpenses';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import ReadyOrderDate from '../ReadyOrderDate';
import CargoShipInfo from '../CargoShipInfo';
import Loader from '../../../../../ui/Loader';
import Header from '../Header';

import { IOrderForm } from '../../../types';
import { IOrder, TStatuses } from '../../../../../../features/order/order.types';


const OrderForm: FC<{ order?: IOrder }> = ({ order }) => {
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

  const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm<IOrderForm>();
  const [selectedStatus, setSelectedStatus] = useState<TStatuses>(order ? order.status.status : 'Ожидает заказа в Китае');
  const show = useStatusShow(statuses, selectedStatus);
  const { onSubmit, mutationLoading } = useSubmitOrder({ order, selectedProducts });
  useStatusChange({ selectedStatus, setValue, statuses });

  if (isLoading || mutationLoading) return <Loader isLoading={true}/>;

  if (isError) return <p>error</p>;

  return (
    <div className='mx-4 my-6'>
      {chinaDistributors && orderForProjects && statuses && products && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => e.code === 'Enter' && e.preventDefault()}
          className='flex flex-col space-y-4'
        >
          <Header order={order}/>
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
                setSelectedStatus={setSelectedStatus}
                order={order}
                statuses={statuses}
              />
            )
          }
          {show('Заказ оформлен') && <ReadyOrderDate order={order}/>}
          {show('Отправлен из Китая') && <CargoShipInfo
            order={order}
            statuses={statuses}
            setSelectedStatus={setSelectedStatus}
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
            setValue={setValue}
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
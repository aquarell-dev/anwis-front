import { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { GreenButton, IndigoButton } from '../../../../ui/Button';
import FormControls from '../../NewOrder/components/FormControls';
import Products from '../Products';

import {
  useCreateOrderMutation,
  useListChinaDistributorsQuery,
  useListIndividualEntrepreneursQuery,
  useListOrderForProjectsQuery, useListProductsQuery,
  useListStatusesQuery
} from '../../../../../features/order/orderApi';

import { IOrderForm } from '../../types';

import { orderService } from '../../../../../features/order/orderServices';
import { notifyError, notifySuccess } from '../../../../../utils/notify';
import { IProduct } from '../../../../../features/order/types';


const OrderForm: FC = () => {
  const {
    data: individualEntrepreneurs,
    error: ipError,
    isLoading: ipLoading
  } = useListIndividualEntrepreneursQuery(null);
  const { data: chinaDistributors, error: chinaError, isLoading: chinaLoading } = useListChinaDistributorsQuery(null);
  const { data: orderForProjects, error: orderError, isLoading: orderLoading } = useListOrderForProjectsQuery(null);
  const { data: statuses, error: statusError, isLoading: statusLoading } = useListStatusesQuery(null);
  const { data: products, error: productsError, isLoading: productsLoading } = useListProductsQuery(null);

  const [createOrder, { isLoading: createOrderLoading }] = useCreateOrderMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<IOrderForm>();

  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  const onSubmit = (data: IOrderForm) => {
    createOrder(orderService.transformData({ ...data, products: selectedProducts.map(p => p.id) }))
      .unwrap()
      .then(() => notifySuccess('Заказ был успешно создан'))
      .catch(() => notifyError('Заказ не был создан'));
  };

  if (ipLoading || chinaLoading || orderLoading || statusLoading || productsLoading) return <p>loading</p>;

  if (ipError || chinaError || orderError || statusError || productsError) return <p>error</p>;

  return (
    <>
      {individualEntrepreneurs && chinaDistributors && orderForProjects && statuses && products && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
        >
          <FormControls
            errors={errors}
            register={register}
            individualEntrepreneurs={individualEntrepreneurs}
            orderForProjects={orderForProjects}
            chinaDistributors={chinaDistributors}
            statuses={statuses}
          />
          <Products products={products} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
          <div className="flex justify-between items-center">
            <IndigoButton
              type={'submit'}
              text={'Создать'}
              handler={() => null}
            />
            <GreenButton
              type={'button'}
              text={'Скачать Excel'}
              handler={() => null}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default OrderForm;
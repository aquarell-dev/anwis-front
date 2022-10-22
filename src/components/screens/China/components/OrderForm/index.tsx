import { FC } from 'react';

import { useForm } from 'react-hook-form';

import { RHFSelect } from '../../../../ui/Input';
import { GreenButton, IndigoButton } from '../../../../ui/Button';

import {
  useListIndividualEntrepreneursQuery,
  useListChinaDistributorsQuery,
  useListOrderForProjectsQuery,
  useListStatusesQuery
} from '../../../../../features/order/orderApi';
import FormControls from '../../NewOrder/components/FormControls';

const OrderForm: FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const {
    data: individualEntrepreneurs,
    error: ipError,
    isLoading: ipLoading
  } = useListIndividualEntrepreneursQuery(null);
  const { data: chinaDistributors, error: chinaError, isLoading: chinaLoading } = useListChinaDistributorsQuery(null);
  const { data: orderForProjects, error: orderError, isLoading: orderLoading } = useListOrderForProjectsQuery(null);
  const { data: statuses, error: statusError, isLoading: statusLoading } = useListStatusesQuery(null);

  if (ipLoading || chinaLoading || orderLoading || statusLoading) return <p>loading</p>;

  if (ipError || chinaError || orderError || statusError) return <p>error</p>;

  return (
    <>
      {individualEntrepreneurs && chinaDistributors && orderForProjects && statuses && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
        >
          <FormControls
            register={register}
            individualEntrepreneurs={individualEntrepreneurs}
            orderForProjects={orderForProjects}
            chinaDistributors={chinaDistributors}
          />
          <div className="flex items-center justify-between">
            <div className='w-40'>
              <RHFSelect
                label={'status'}
                register={register}
                required={false}
                text={'Статус'}
                options={statuses.map(status => ({
                  value: status.status,
                  label: status.status
                }))}
                defaultValue={'В ожидании'}
              />
            </div>
            <div className='flex items-center space-x-3'>
              <p className='text-xl font-medium'>Черновик</p>
              <input
                type='checkbox'
                {...register('draft')}
                className='mx-3'
              />
            </div>
          </div>
          <div className='w-full'>
            <p>Комментарий к заказу</p>
            <textarea className={'bg-gray-100 w-full h-40'} {...register('comment')} />
          </div>
          <div className="flex justify-between items-center">
            <IndigoButton
              type={'submit'}
              text={'Создать'}
              handler={() => {
              }}
            />
            <GreenButton
              type={'button'}
              text={'Скачать Excel'}
              handler={() => {
              }}
            />
          </div>
        </form>
      )}

    </>
  );
};

export default OrderForm;
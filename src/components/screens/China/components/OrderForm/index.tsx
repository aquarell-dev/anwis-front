import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { RHFInput, RHFSelect } from '../../../../ui/Input';
import { GreenButton, IndigoButton } from '../../../../ui/Button';

const OrderForm: FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
      <RHFInput label={'ip'} register={register} required={false} placeholder={'Ип'}/>
      <RHFInput label={'chinaDistributor'} register={register} required={false} placeholder={'Китайский посредник'}/>
      <RHFInput label={'project'} register={register} required={false} placeholder={'Заказ под проект'}/>
      <RHFSelect label={'c'} register={register} required={false} text={'Продукты'}
                 options={[{ label: '1', value: '1' }]}/>

      <div className="flex items-center justify-between">
        <div className='w-40'>
          <RHFSelect label={'status'} register={register} required={false} text={'Статус'}
                     options={[{ label: '1', value: '1' }]} defaultValue={'В ожидании'}/>
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
        <IndigoButton type={'submit'} text={'Создать'} handler={() => {
        }}/>
        <GreenButton type={'button'} text={'Скачать Excel'} handler={() => {
        }}/>
      </div>
    </form>
  );
};

export default OrderForm;
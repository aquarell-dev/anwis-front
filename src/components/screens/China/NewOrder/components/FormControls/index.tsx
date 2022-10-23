import ChoseCreateBlock from '../../../components/ChooseCreateBlock';
import { RHFSelect } from '../../../../../ui/Input';
import { CreatePopup } from '../../../../../ui/Popup';

import { FC, useState } from 'react';

import { IFormControls } from '../../../types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  useCreateChinaDistributorMutation,
  useCreateIndividualEntrepreneurMutation,
  useCreateOrderForProjectMutation
} from '../../../../../../features/order/orderApi';
import { notifyError, notifySuccess } from '../../../../../../utils/notify';

const FormControls: FC<IFormControls> = ({
                                           register,
                                           individualEntrepreneurs,
                                           chinaDistributors,
                                           orderForProjects,
                                           statuses,
                                           errors
                                         }) => {
  const [individualEntrepreneurOpen, setIndividualEntrepreneurOpen] = useState(false);
  const [orderForProjectOpen, setOrderForProjectOpen] = useState(false);
  const [chinaDistributorOpen, setChinaDistributorOpen] = useState(false);

  const [individualEntrepreneurValue, setIndividualEntrepreneurValue] = useState('');
  const [orderForProjectValue, setOrderForProjectValue] = useState('');
  const [chinaDistributorValue, setChinaDistributorValue] = useState('');

  const [createIndividualEntrepreneur, {
    isLoading: individualEntrepreneurLoading
  }] = useCreateIndividualEntrepreneurMutation();
  const [createChinaDistributor, {
    isLoading: chinaDistributorLoading
  }] = useCreateChinaDistributorMutation();
  const [createOrderForProject, {
    isLoading: orderForProjectLoading
  }] = useCreateOrderForProjectMutation();

  return (
    <>
      <ChoseCreateBlock setState={setIndividualEntrepreneurOpen}>
        <RHFSelect
          label={'individual_entrepreneur'}
          register={register}
          required={true}
          error={errors?.individual_entrepreneur}
          text={'Индивидуальный предприниматель'}
          options={individualEntrepreneurs?.map(indEnt => ({
            value: indEnt.id,
            label: indEnt.individual_entrepreneur
          }))}
        />
      </ChoseCreateBlock>
      <ChoseCreateBlock setState={setChinaDistributorOpen}>
        <RHFSelect
          label={'china_distributor'}
          register={register}
          required={true}
          text={'Китайский посредник'}
          error={errors?.china_distributor}
          options={chinaDistributors.map(chDistr => ({
            value: chDistr.id,
            label: chDistr.china_distributor
          }))}
        />
      </ChoseCreateBlock>
      <ChoseCreateBlock setState={setOrderForProjectOpen}>
        <RHFSelect
          label={'order_for_project'}
          register={register}
          required={true}
          error={errors?.order_for_project}
          text={'Заказ под проект'}
          options={orderForProjects.map(ordProj => ({
            value: ordProj.id,
            label: ordProj.order_for_project
          }))}
        />
      </ChoseCreateBlock>
      <CreatePopup
        value={individualEntrepreneurValue}
        setValue={setIndividualEntrepreneurValue}
        state={individualEntrepreneurOpen}
        isLoading={individualEntrepreneurLoading}
        handler={() => {
          createIndividualEntrepreneur({ individual_entrepreneur: individualEntrepreneurValue })
            .unwrap()
            .then(() => notifySuccess(`Успешно создан ${individualEntrepreneurValue}`))
            .catch(() => notifyError(`Ошибка при создании ${individualEntrepreneurValue}`))
            .finally(() => setIndividualEntrepreneurOpen(false));
        }}
        title='Индивидуальный предприниматель'
        setState={setIndividualEntrepreneurOpen}
      />
      <CreatePopup
        value={chinaDistributorValue}
        setValue={setChinaDistributorValue}
        state={chinaDistributorOpen}
        setState={setChinaDistributorOpen}
        isLoading={chinaDistributorLoading}
        handler={() => {
          createChinaDistributor({ china_distributor: chinaDistributorValue })
            .unwrap()
            .then(() => notifySuccess(`Успешно создан ${chinaDistributorValue}`))
            .catch(() => notifyError(`Ошибка при создании ${chinaDistributorValue}`))
            .finally(() => setChinaDistributorOpen(false));
        }}
        title={'Китайский посредник'}
      />
      <CreatePopup
        value={orderForProjectValue}
        setValue={setOrderForProjectValue}
        state={orderForProjectOpen}
        isLoading={orderForProjectLoading}
        handler={() => {
          createOrderForProject({ order_for_project: orderForProjectValue })
            .unwrap()
            .then(() => notifySuccess(`Успешно создан ${orderForProjectValue}`))
            .catch(() => notifyError(`Ошибка при создании ${orderForProjectValue}`))
            .finally(() => setOrderForProjectOpen(false));
        }}
        title={'Заказ под проект'}
        setState={setOrderForProjectOpen}
      />
      <ToastContainer/>
      <div className="flex items-center justify-between">
        <div className='w-40'>
          <RHFSelect
            label={'status'}
            register={register}
            required={true}
            text={'Статус'}
            error={errors?.status}
            options={statuses.map(status => ({
              value: status.id,
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
        <textarea className={'bg-gray-100 w-full'} {...register('comment')} />
      </div>
    </>
  );
};

export default FormControls;
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
                                           orderForProjects
                                         }) => {
  const [individualEntrepreneurOpen, setIndividualEntrepreneurOpen] = useState(false);
  const [orderForProjectOpen, setOrderForProjectOpen] = useState(false);
  const [chinaDistributorOpen, setChinaDistributorOpen] = useState(false);

  const [individualEntrepreneurValue, setIndividualEntrepreneurValue] = useState('');
  const [orderForProjectValue, setOrderForProjectValue] = useState('');
  const [chinaDistributorValue, setChinaDistributorValue] = useState('');

  const [createIndividualEntrepreneur, {
    error: individualEntrepreneurError,
    isLoading: individualEntrepreneurLoading
  }] = useCreateIndividualEntrepreneurMutation();
  const [createChinaDistributor, {
    error: chinaDistributorError,
    isLoading: chinaDistributorLoading
  }] = useCreateChinaDistributorMutation();
  const [createOrderForProject, {
    error: orderForProjectError,
    isLoading: orderForProjectLoading
  }] = useCreateOrderForProjectMutation(); // TODO add error check after

  console.log(chinaDistributorError);

  return (
    <>
      <ChoseCreateBlock setState={setIndividualEntrepreneurOpen}>
        <RHFSelect
          label={'individual_entrepreneur'}
          register={register}
          required={false}
          text={'Индивидуальный предприниматель'}
          options={individualEntrepreneurs?.map(indEnt => ({
            value: indEnt.individual_entrepreneur,
            label: indEnt.individual_entrepreneur
          }))}
        />
      </ChoseCreateBlock>
      <ChoseCreateBlock setState={setChinaDistributorOpen}>
        <RHFSelect
          label={'china_distributor'}
          register={register}
          required={false}
          text={'Китайский посредник'}
          options={chinaDistributors.map(chDistr => ({
            value: chDistr.china_distributor,
            label: chDistr.china_distributor
          }))}
        />
      </ChoseCreateBlock>
      <ChoseCreateBlock setState={setOrderForProjectOpen}>
        <RHFSelect
          label={'order_for_project'}
          register={register}
          required={false}
          text={'Заказ под проект'}
          options={orderForProjects.map(ordProj => ({
            value: ordProj.order_for_project,
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
          createIndividualEntrepreneur({ individual_entrepreneur: individualEntrepreneurValue });
          !individualEntrepreneurError ? notifyError(`Ошибка при создании ${individualEntrepreneurValue}`) : notifySuccess(`Успешно создан ${individualEntrepreneurValue}`);
          setIndividualEntrepreneurOpen(false);
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
          createChinaDistributor({ china_distributor: chinaDistributorValue });
          !chinaDistributorError ? notifyError(`Ошибка при создании ${chinaDistributorValue}`) : notifySuccess(`Успешно создан ${chinaDistributorValue}`);
          setChinaDistributorOpen(false);
        }}
        title={'Китайский посредник'}
      />
      <CreatePopup
        value={orderForProjectValue}
        setValue={setOrderForProjectValue}
        state={orderForProjectOpen}
        isLoading={orderForProjectLoading}
        handler={() => {
          createOrderForProject({ order_for_project: orderForProjectValue });
          !orderForProjectError ? notifyError(`Ошибка при создании ${orderForProjectValue}`) : notifySuccess(`Успешно создан ${orderForProjectValue}`);
          setOrderForProjectOpen(false);
        }}
        title={'Заказ под проект'}
        setState={setOrderForProjectOpen}
      />
      <ToastContainer/>
    </>
  );
};

export default FormControls;
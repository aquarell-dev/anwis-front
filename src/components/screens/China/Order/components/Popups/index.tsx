import { CreatePopup } from '../../../../../ui/Popup';

import { SetState } from '../../../../../../utils/types';

import useCreateDataMutations from '../../hooks/useCreateDataMutations';

import { FC } from 'react';
import useNotifications from '../../../../../../hooks/useNotifications';

interface IPopupsProps {
  chinaDistributorOpen: boolean;
  setChinaDistributorOpen: SetState<boolean>;
  chinaDistributorValue: string;
  setChinaDistributorValue: SetState<string>;
  orderForProjectOpen: boolean;
  setOrderForProjectOpen: SetState<boolean>;
  orderForProjectValue: string;
  setOrderForProjectValue: SetState<string>;
}

const Popups: FC<IPopupsProps> = ({
                                    chinaDistributorOpen,
                                    setChinaDistributorOpen,
                                    chinaDistributorValue,
                                    setChinaDistributorValue,
                                    orderForProjectOpen,
                                    orderForProjectValue,
                                    setOrderForProjectOpen,
                                    setOrderForProjectValue
                                  }) => {
  const {
    createChinaDistributor, createOrderForProject,
    chinaDistributorLoading, orderForProjectLoading
  } = useCreateDataMutations();

  const { notifySuccess, notifyError } = useNotifications();

  return (
    <>
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
    </>
  );
};

export default Popups;
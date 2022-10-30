import { FC } from 'react';

import { useNavigate } from 'react-router-dom';


import { GreenButton, IndigoButton, RedButton } from '../../../../ui/Button';

import { IOrder } from '../../../../../features/order/types';

const ButtonGroup: FC<{ order?: IOrder }> = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <IndigoButton
          type={'submit'}
          text={order ? 'Обновить' : 'Создать'}
          handler={() => null}
        />
        <IndigoButton
          type={'submit'}
          customWidth={'w-60'}
          text={order ? 'Сохранить и закрыть' : 'Создать и закрыть'}
          handler={() => navigate('/china')}
        />
        <RedButton
          type={'button'}
          customWidth={'w-60'}
          text={'Закрыть'}
          handler={() => navigate('/china')}
        />
      </div>
      {order && <GreenButton
        type={'button'}
        text={'Скачать Excel'}
        handler={() => null}
      />}
    </div>
  )
};

export default ButtonGroup;
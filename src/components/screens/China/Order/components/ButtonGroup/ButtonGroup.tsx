import { FC, useRef } from 'react';

import { useNavigate } from 'react-router-dom';


import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button';

import { IOrder } from '../../../../../../features/order/order.types';
import useExcelCreate from '../../hooks/useExcelCreate';
import { SpinnerComponent } from 'react-element-spinner';

const ButtonGroup: FC<{ order?: IOrder }> = ({ order }) => {
  const navigate = useNavigate();
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const { createExcel, isLoading, error } = useExcelCreate();

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
      {order?.id &&
      (
        <GreenButton
          type={'button'}
          text={order?.excel ? 'Скачать эксель' : 'Создать эксель'}
          handler={() => order?.excel ? downloadRef.current?.click() : createExcel(order.id)}
        >
          {isLoading && <SpinnerComponent loading={true} position={'inline'} />}
        </GreenButton>
      )
      }
      <a
        ref={downloadRef}
        className='hidden'
        target='_blank'
        download
        href={order?.excel}
      />
    </div>
  );
};

export default ButtonGroup;
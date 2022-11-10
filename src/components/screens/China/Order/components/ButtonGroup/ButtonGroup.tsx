import { FC, useRef } from 'react';

import { useNavigate } from 'react-router-dom';


import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button';

import { IOrder, TStatuses } from '../../../../../../features/order/order.types';
import useExcelCreate from '../../hooks/useExcelCreate';
import { SpinnerComponent } from 'react-element-spinner';
import { SetState } from '../../../../../../utils/types';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';
import { useDeleteOrderMutation } from '../../../../../../store/api/order.api';
import useNotifications from '../../../../../../hooks/useNotifications';

const ButtonGroup: FC<{ order?: IOrder, selectedStatus: TStatuses, setSelectedStatus: SetState<TStatuses> }> = ({
                                                                                                                  order,
                                                                                                                  selectedStatus,
                                                                                                                  setSelectedStatus
                                                                                                                }) => {
  const navigate = useNavigate();
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const { createExcel, isLoading, error } = useExcelCreate(selectedStatus, setSelectedStatus);
  const [deleteOrder, _] = useDeleteOrderMutation();
  const { notifySuccess, notifyError } = useNotifications();

  const { updateOrder } = useUpdatePartialOrder();

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
          handler={() => navigate('/china/orders/')}
        />
        <RedButton
          type={'button'}
          customWidth={'w-60'}
          text={'Закрыть'}
          handler={() => navigate('/china')}
        />
        {order && (
          <RedButton
            type='button'
            text='Удалить'
            handler={() => deleteOrder(order.id)
              .unwrap()
              .then(() => {
                navigate('china/orders/');
                notifySuccess('Заказ был успешно удален');
              })
              .catch(() => notifyError('Заказ не был удален'))
            }
          />
        )}
        {selectedStatus === 'Заказ в Москве' && !order?.archive && (
          <IndigoButton
            type='button'
            text='Отправить заказ в архив'
            customWidth={'w-60'}
            handler={() => order && updateOrder({ id: order.id, archive: true })}
          />
        )}
        {order?.archive && (
          <IndigoButton
            type='button'
            text='Убрать из архива'
            customWidth={'w-60'}
            handler={() => order && updateOrder({ id: order.id, archive: false })}
          />
        )}
      </div>
      <div className='flex space-x-4 items-center'>
        {order?.excel ? (
          <>
            <GreenButton
              type={'button'}
              text={'Переформировать эксель'}
              customWidth='w-80'
              handler={() => createExcel(order?.id)}
            >
              {isLoading && <SpinnerComponent
                loading={true}
                position={'inline'}
              />}
            </GreenButton>
            <GreenButton
              type={'button'}
              text={'Скачать эксель'}
              handler={() => downloadRef.current?.click()}
            />
          </>
        ) : (
          <GreenButton
            type={'button'}
            text={'Создать эксель'}
            handler={() => order?.id && createExcel(order.id)}
          >
            {isLoading && <SpinnerComponent
              loading={true}
              position={'inline'}
            />}
          </GreenButton>
        )}
      </div>
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
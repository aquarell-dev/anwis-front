import { BaseSyntheticEvent, FC, useRef } from 'react'
import { SpinnerComponent } from 'react-element-spinner'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder'
import useExcelCreate from '../../hooks/useExcelCreate'

import { IOrder, TStatuses } from '../../../../../../features/order/order.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'
import { IOrderForm } from '../../../types'
import DeleteOrderButton from '../DeleteOrderButton'

const ButtonGroup: FC<{
  order?: IOrder
  selectedStatus: TStatuses
  setSelectedStatus: SetState<TStatuses>
  handleSubmit: (
    onValid: SubmitHandler<IOrderForm>,
    onInvalid?: SubmitErrorHandler<IOrderForm>
  ) => (e?: BaseSyntheticEvent) => Promise<void>
  onSubmit: (data: IOrderForm, redirect?: string) => void
}> = ({ order, selectedStatus, setSelectedStatus, handleSubmit, onSubmit }) => {
  const navigate = useNavigate()
  const downloadRef = useRef<HTMLAnchorElement | null>(null)
  const { createExcel, isLoading, error } = useExcelCreate(selectedStatus, setSelectedStatus)

  const { updateOrder } = useUpdatePartialOrder()

  return (
    <div className='flex justify-between items-center mt-6 mb-4 border-t pt-2 border-slate-600'>
      <div className='flex items-center space-x-4'>
        <IndigoButton
          type={'button'}
          text={order ? 'Обновить' : 'Создать'}
          handler={handleSubmit(data => onSubmit(data))}
        />
        <IndigoButton
          type={'button'}
          customWidth={'w-60'}
          text={order ? 'Обновить и закрыть' : 'Создать и закрыть'}
          handler={handleSubmit(data => onSubmit(data, '../orders'))}
        />
        <RedButton
          type={'button'}
          customWidth={'w-60'}
          text={'Закрыть'}
          handler={() => navigate('/china')}
        />
        <DeleteOrderButton order={order} />
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
              {isLoading && (
                <SpinnerComponent
                  loading={true}
                  position={'inline'}
                />
              )}
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
            {isLoading && (
              <SpinnerComponent
                loading={true}
                position={'inline'}
              />
            )}
          </GreenButton>
        )}
      </div>
      <a
        ref={downloadRef}
        className='hidden'
        target='_blank'
        download
        href={order?.excel}
        rel='noreferrer'
      >
        Скачать
      </a>
    </div>
  )
}

export default ButtonGroup

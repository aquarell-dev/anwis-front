import { FC, useState } from 'react'
import Expand from 'react-expand-animated'

import useNotifications from '../../../../../../hooks/useNotifications'
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder'
import useCargo from '../../hooks/useCargo'

import { IOrder, IStatus, TStatuses } from '../../../../../../features/order/order.types'
import { useUpdateAcceptanceFromOrderMutation } from '../../../../../../store/api/acceptance.api'
import { SetState } from '../../../../../../utils/types'
import { FileButton, GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'
import { CustomDatePicker } from '../../../../../ui/DateTime'
import CargoDelivery from '../CargoDelivery'
import CargoInputs from '../CargoInputs'

const CargoShipInfo: FC<{
  order?: IOrder
  statuses: IStatus[]
  setSelectedStatus: SetState<TStatuses>
}> = ({ order, statuses, setSelectedStatus }) => {
  const [open, setOpen] = useState(!!order?.cargo_number)
  const [file, setFile] = useState<File | null>(null)

  const [updateAcceptance, _] = useUpdateAcceptanceFromOrderMutation()
  const {
    fromChina,
    setFromChina,
    inMoscow,
    setInMoscow,
    cargoInfo,
    setCargoInfo,
    realInMoscow,
    setRealInMoscow
  } = useCargo(order, file)
  const { updateOrder } = useUpdatePartialOrder()
  const { notifyError } = useNotifications()

  const lastStatus = statuses?.find(status => status.status === 'Заказ в Москве')

  return (
    <div className='w-full flex justify-between'>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center space-x-4'>
          <FileButton
            onChange={e => {
              e.target.files && setFile(e.target.files[0])
              setOpen(true)
            }}
            customWidth={'w-60'}
            text={'Загрузить файл карго'}
          />
          <GreenButton
            type={'button'}
            text={open ? 'Закрыть' : 'Заполнить вручную'}
            customWidth={'w-60'}
            handler={() => setOpen(!open)}
          />
          <RedButton
            type='button'
            text='Товар уже приехал'
            handler={() => {
              if (!cargoInfo.real_in_moscow_date)
                return notifyError('Укажите фактическую дату приезда!')

              if (!order) return

              updateOrder(
                {
                  id: order.id,
                  status: lastStatus?.id,
                  delivered: true,
                  real_in_moscow_date: cargoInfo.real_in_moscow_date
                },
                () => lastStatus && setSelectedStatus(lastStatus.status)
              )

              if (!order.acceptance) return

              updateAcceptance({ order_id: order.id, acceptance_id: order.acceptance })
                .unwrap()
                .catch(() => notifyError('Приемка не обновлена'))
            }}
            customWidth='w-60'
          />
        </div>
        <Expand open={open}>
          <IndigoButton
            type={'button'}
            customWidth={'w-60'}
            text={'Сохранить'}
            handler={() => {
              if (!order) return

              updateOrder({
                id: order.id,
                ...cargoInfo,
                delivered: false
              })
              if (!order.acceptance) return

              updateAcceptance({ order_id: order.id, acceptance_id: order.acceptance })
                .unwrap()
                .catch(() => notifyError('Приемка не обновлена'))
            }}
          />
          <div className='h-2' />
          <div className='grid grid-cols-3 gap-x-2 gap-y-4'>
            <CargoInputs
              cargoInfo={cargoInfo}
              setCargoInfo={setCargoInfo}
            />
            <CustomDatePicker
              label={'Дата Отправки из Китая'}
              value={fromChina}
              setValue={setFromChina}
            />
          </div>
        </Expand>
        <div className='flex items-center space-x-4 w-full'>
          <div className='w-96'>
            <CustomDatePicker
              label={'Приблизительная Дата Доставки в Москву'}
              value={inMoscow}
              customStyling={'w-full'}
              setValue={setInMoscow}
            />
          </div>
          <div className='w-96'>
            <CustomDatePicker
              label={'Фактическая Дата Доставки в Москву'}
              value={realInMoscow}
              customStyling={'w-full'}
              setValue={setRealInMoscow}
            />
          </div>
        </div>
        <CargoDelivery
          statuses={statuses}
          setSelectedStatus={setSelectedStatus}
          order={order}
          inMoscow={inMoscow}
          setInMoscow={setInMoscow}
          cargoInfo={cargoInfo}
        />
      </div>
    </div>
  )
}

export default CargoShipInfo

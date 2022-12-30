import { FC, useEffect, useState } from 'react'

import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder'
import useSplitBill from '../../hooks/useSplitBill'

import { orderService } from '../../../../../../features/order/order.services'
import {
  IOrder,
  IProductSpecs,
  IStatus,
  TStatuses
} from '../../../../../../features/order/order.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton, IndigoButton } from '../../../../../ui/Button'
import { FancyInput } from '../../../../../ui/Input'
import SlideAlert from '../../../../../ui/SlideAlert'
import { TAdditional } from '../../../types'

const AdditionalExpenses: FC<{
  additional: Partial<TAdditional>
  setAdditional: SetState<TAdditional>
  selectedProducts: IProductSpecs[]
  setSelectedProducts: SetState<IProductSpecs[]>
  selectedStatus: TStatuses
  setSelectedStatus: SetState<TStatuses>
  statuses: IStatus[]
  order?: IOrder
}> = ({
  additional,
  setAdditional,
  selectedProducts,
  setSelectedProducts,
  selectedStatus,
  setSelectedStatus,
  order,
  statuses
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState('')

  const nextStatus = statuses.find(status => status.status === 'Заказ оформлен')
  const orderToBeUpdated = orderService.transformOrder(
    order,
    selectedStatus === 'Отправлен поставщику для просчета' ? nextStatus : undefined,
    selectedProducts,
    additional
  )
  const { updateOrder } = useUpdatePartialOrder()

  const { split, skip } = useSplitBill(
    additional,
    selectedProducts,
    setSelectedProducts,
    setDialogContent,
    setDialogOpen
  )

  const submit = () => {
    setDialogOpen(false)
    updateOrder(
      orderToBeUpdated,
      () =>
        selectedStatus === 'Отправлен поставщику для просчета' &&
        nextStatus &&
        setSelectedStatus(nextStatus.status)
    )
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (dialogOpen) {
      timer = setTimeout(() => submit(), 5000)
    }

    return () => clearTimeout(timer)
  }, [dialogOpen])

  return (
    <div className='flex items-end flex-col justify-center space-y-2 3xl:space-y-0 3xl:flex-row 3xl:space-x-4'>
      <div className='flex flex-col items-center w-full justify-start xl:flex-row xl:items-center xl:space-x-4'>
        <FancyInput
          type={'number'}
          placeholder='Курс'
          value={additional.course}
          handler={e => setAdditional(prev => ({ ...prev, course: parseFloat(e.target.value) }))}
          showLabel
        />
        <FancyInput
          type={'number'}
          showLabel
          placeholder='Доп. затраты ¥'
          value={additional.expensesCny}
          handler={e =>
            setAdditional(prev => ({ ...prev, expensesCny: parseFloat(e.target.value) }))
          }
        />
        <FancyInput
          type={'number'}
          showLabel
          placeholder='Доп. затраты ₽'
          value={additional.expensesRub}
          handler={e =>
            setAdditional(prev => ({ ...prev, expensesRub: parseFloat(e.target.value) }))
          }
        />
      </div>
      <div className='flex flex-col items-center xl:items-start w-full space-y-2 2xl:space-y-0 2xl:space-x-2 2xl:flex-row'>
        <IndigoButton
          type={'button'}
          text={'Рассчитать поровну'}
          handler={() => split()}
          customWidth={'w-64'}
        />
        <GreenButton
          type={'button'}
          text={'Оставить все как есть'}
          handler={() => skip()}
          customWidth={'w-64'}
        />
      </div>
      <SlideAlert
        open={dialogOpen}
        title={'Вы уверены что хотите продолжить?'}
        content={dialogContent}
        buttonText={['Да', 'Нет']}
        onAccept={submit}
        onClose={() => setDialogOpen(false)}
        onDeny={() => setDialogOpen(false)}
      />
    </div>
  )
}

export default AdditionalExpenses

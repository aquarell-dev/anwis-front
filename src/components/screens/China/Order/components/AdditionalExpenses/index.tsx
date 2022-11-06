import { FC, useEffect, useState } from 'react';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';

import { SetState } from '../../../../../../utils/types';
import { TAdditional } from '../../../types';
import { IOrder, IProductSpecs, IStatus, TStatuses } from '../../../../../../features/order/order.types';

import { GreenButton, IndigoButton } from '../../../../../ui/Button';
import SlideAlert from '../../../../../ui/SlideAlert';
import { FancyInput } from '../../../../../ui/Input';

import { orderService } from '../../../../../../features/order/order.services';
import useSplitBill from '../../hooks/useSplitBill';


const AdditionalExpenses: FC<{
  additional: Partial<TAdditional>,
  setAdditional: SetState<TAdditional>,
  selectedProducts: IProductSpecs[],
  setSelectedProducts: SetState<IProductSpecs[]>,
  setSelectedStatus: SetState<TStatuses>,
  statuses: IStatus[],
  order?: IOrder
}> = ({ additional, setAdditional, selectedProducts, setSelectedProducts, setSelectedStatus, order, statuses }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const nextStatus = statuses.find(status => status.status === 'Заказ оформлен');
  const orderToBeUpdated = orderService.transformOrder(
    order,
    nextStatus,
    selectedProducts,
    additional
  );
  const updateOrder = useUpdatePartialOrder();

  const { split, skip } = useSplitBill(additional, selectedProducts, setSelectedProducts, setDialogContent, setDialogOpen);

  const submit = () => {
    setDialogOpen(false);
    updateOrder(orderToBeUpdated, () => nextStatus && setSelectedStatus(nextStatus.status));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (dialogOpen) {
      timer = setTimeout(() => submit(), 5000);
    }

    return () => clearTimeout(timer);
  }, [dialogOpen]);

  return (
    <div className='flex items-end space-x-4'>
      <FancyInput
        type={'number'}
        placeholder='Курс'
        value={additional.course}
        handler={e => setAdditional(prev => ({ ...prev, course: parseInt(e.target.value) }))}
        showLabel
      />
      <FancyInput
        type={'number'}
        showLabel
        placeholder='Доп. затраты ¥'
        value={additional.expensesCny}
        handler={e => setAdditional(prev => ({ ...prev, expensesCny: parseInt(e.target.value) }))}
      />
      <FancyInput
        type={'number'}
        showLabel
        placeholder='Доп. затраты ₽'
        value={additional.expensesRub}
        handler={e => setAdditional(prev => ({ ...prev, expensesRub: parseInt(e.target.value) }))}
      />
      <IndigoButton
        type={'button'}
        text={'Рассчитать поровну'}
        handler={() => split()}
        customWidth={'w-56'}
      />
      <GreenButton
        type={'button'}
        text={'Оставить все как есть'}
        handler={() => skip()}
        customWidth={'w-60'}
      />
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
  );
};

export default AdditionalExpenses;
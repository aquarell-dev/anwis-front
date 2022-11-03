import { FC, useEffect, useState } from 'react';
import useUpdatePartialOrder from '../../hooks/useUpdatePartialOrder';

import { SetState } from '../../../../../utils/types';
import { TAdditional } from '../../types';
import { IOrder, IProductSpecs, IStatus } from '../../../../../features/order/types';

import { GreenButton, IndigoButton } from '../../../../ui/Button';
import SlideAlert from '../../../../ui/SlideAlert';
import { FancyInput } from '../../../../ui/Input';

import { orderService } from '../../../../../features/order/orderServices';


const AdditionalExpenses: FC<{
  additional: Partial<TAdditional>,
  setAdditional: SetState<TAdditional>,
  selectedProducts: IProductSpecs[],
  setSelectedProducts: SetState<IProductSpecs[]>,
  statuses: IStatus[],
  order?: IOrder
}> = ({ additional, setAdditional, selectedProducts, setSelectedProducts, order, statuses }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const orderToBeUpdated = orderService.transformOrder(
    order,
    statuses.find(status => status.status === 'Заказ оформлен'),
    selectedProducts,
    additional
  );
  const updateOrder = useUpdatePartialOrder();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (dialogOpen) {
      timer = setTimeout(() => {
        setDialogOpen(false);
        updateOrder(orderToBeUpdated);
      }, 5000);
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
        handler={() => orderService.handleSplitBill(additional, selectedProducts, setSelectedProducts, setDialogContent, setDialogOpen)}
        customWidth={'w-56'}
      />
      <GreenButton
        type={'button'}
        text={'Оставить все как есть'}
        handler={() => orderService.skipSplittingBill(additional, selectedProducts, setSelectedProducts, setDialogContent, setDialogOpen)}
        customWidth={'w-60'}
      />
      <SlideAlert
        open={dialogOpen}
        title={'Вы уверены что хотите продолжить?'}
        content={dialogContent}
        buttonText={['Да', 'Нет']}
        onAccept={() => {
          setDialogOpen(false);
          updateOrder(orderToBeUpdated);
        }}
        onClose={() => setDialogOpen(false)}
        onDeny={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default AdditionalExpenses;
import { FC, useEffect, useState } from 'react';

import { SetState } from '../../../../../utils/types';
import { TAdditional } from '../../types';
import { IOrder, IProductSpecs, IStatus } from '../../../../../features/order/types';

import { GreenButton, IndigoButton } from '../../../../ui/Button';
import SlideAlert from '../../../../ui/SlideAlert';

import useUpdateOrder from '../../hooks/useUpdateOrder';

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

  const [updateOrder] = useUpdateOrder();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (dialogOpen) {
      timer = setTimeout(() => {
        setDialogOpen(false);
        updateOrder({ order, statuses, selectedProducts });
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [dialogOpen]);

  return (
    <div className='flex items-center space-x-4'>
      <input
        type={'number'}
        className='w-96 outline-none py-1 px-2 border border-gray-300 rounded-sm'
        placeholder='Курс'
        value={additional.course}
        onChange={e => setAdditional(prev => ({ ...prev, course: parseInt(e.target.value) }))}
      />
      <input
        type={'number'}
        className='w-96 outline-none py-1 px-2 border border-gray-300 rounded-sm'
        placeholder='Доп. затраты ¥'
        value={additional.expensesCny}
        onChange={e => setAdditional(prev => ({ ...prev, expensesCny: parseInt(e.target.value) }))}
      />
      <input
        type={'number'}
        className='w-96 outline-none py-1 px-2 border border-gray-300 rounded-sm'
        placeholder='Доп. затраты ₽'
        value={additional.expensesRub}
        onChange={e => setAdditional(prev => ({ ...prev, expensesRub: parseInt(e.target.value) }))}
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
          updateOrder({ order, statuses, selectedProducts });
        }}
        onClose={() => setDialogOpen(false)}
        onDeny={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default AdditionalExpenses;
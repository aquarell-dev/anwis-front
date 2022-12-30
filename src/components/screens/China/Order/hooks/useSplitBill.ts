import { TAdditional } from '../../types';
import { IProductSpecs } from '../../../../../features/order/order.types';
import { SetState } from '../../../../../utils/types';
import useNotifications from '../../../../../hooks/useNotifications';

const getUndefinedProductsCount = (products: IProductSpecs[]) => {
  let undefinedProducts = 0;

  products.forEach(product => !product.price_cny || !product.price_rub || !product.quantity ? undefinedProducts + 1 : undefinedProducts);

  return undefinedProducts;
};

const useSplitBill = (
  additional: TAdditional,
  selectedProducts: IProductSpecs[], setSelectedProducts: SetState<IProductSpecs[]>,
  setDialogContent: SetState<string>,
  setDialogOpen: SetState<boolean>,
) => {
  const { notifySuccess, notifyError } = useNotifications();

  const split = () => {
    if (!additional.course) return notifyError('Не указан курс');

    if (!additional.expensesRub && !additional.expensesCny) return notifyError('Не указаны доп. расходы');

    const { course, expensesCny, expensesRub } = additional;

    setSelectedProducts(prev => prev.map(product => {
      let totalExpenses = 0;

      if (!expensesRub && expensesCny) totalExpenses = expensesCny * course;
      else if (expensesRub && !expensesCny) totalExpenses = expensesRub;
      else if (expensesRub && expensesCny) totalExpenses = expensesCny * course + expensesRub;

      return {
        ...product,
        additional_expenses: Math.round(totalExpenses / product.quantity)
      };
    }));

    let undefinedProducts = getUndefinedProductsCount(selectedProducts);

    setDialogContent(`У Вас есть 5 секунд, чтобы принять решение, иначе произойдет переход на следующий статус. Количество незаполненных товаров: ${undefinedProducts}`);
    setDialogOpen(true);
  };

  const skip = () => {
    if (!additional.course) return notifyError('Не указан курс');

    let undefinedProducts = getUndefinedProductsCount(selectedProducts);

    setSelectedProducts(prev => prev.map(product => ({ ...product, additional_expenses: 0 })));

    setDialogContent(`У Вас есть 5 секунд, чтобы принять решение, иначе произойдет переход на следующий статус. Количество незаполненных товаров: ${undefinedProducts}`);
    setDialogOpen(true);
  };

  return { split, skip };
};

export default useSplitBill;
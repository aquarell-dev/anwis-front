import { IOrderForm, TAdditional } from '../../components/screens/China/types';
import { ICreateUpdateOrder, IOrder, IOrderRows, IProductSpecs } from './types';
import { AnyObject, Mutation, SetState } from '../../utils/types';
import { notifyError, notifySuccess } from '../../utils/notify';
import { IProductsRows } from '../../components/screens/China/components/Products/types';

class OrderService {
  public transformData = (data: IOrderForm): ICreateUpdateOrder => {
    const resultData: AnyObject = {};

    Object.entries(data).map(d => {
      const [key, value] = d;

      console.log(key, value);

      const intValue = parseInt(value);

      resultData[key] = (isNaN(intValue) || Array.isArray(value)) ? value : intValue;
    });

    return resultData as ICreateUpdateOrder;
  };

  public updateAndTransformOrder = (order: IOrder, nextStatusId: number, selectedProducts: IProductSpecs[]): ICreateUpdateOrder => {
    const {
      additional_expenses,
      price_cny,
      price_rub,
      quantity
    } = selectedProducts.reduce((prev, current) => ({
      ...prev,
      price_cny: prev.price_cny + current.price_cny,
      price_rub: prev.price_rub + current.price_rub,
      quantity: prev.quantity + current.quantity,
      additional_expenses: prev.additional_expenses + current.additional_expenses,
    }));

    return {
      ...order,
      individual_entrepreneur: 1,
      china_distributor: order.china_distributor.id,
      order_for_project: order.order_for_project.id,
      tasks: order.tasks.map(task => task.id),
      status: nextStatusId,
      products: selectedProducts.map(product => ({ ...product, product: product.product.id })),
      total_cny: price_cny,
      total_rub: price_rub,
      total_quantity: quantity,
      total_expenses: additional_expenses,
    };
  };

  public formRows = (data: IOrder[]): IOrderRows[] => data.map(d => ({
    id: d.id,
    individual_entrepreneur: d.individual_entrepreneur.individual_entrepreneur,
    china_distributor: d.china_distributor.china_distributor,
    order_for_project: d.order_for_project.order_for_project,
    status: d.status.status
  }));

  public submitForm = (data: IOrderForm, mutation: Mutation<ICreateUpdateOrder>, individualEntrepreneur: number, selectedProducts: IProductSpecs[], id?: number) => {
    console.log(data);

    let transformedData = orderService.transformData({
      ...data,
      products: selectedProducts.map(p => ({
        quantity: p.quantity,
        price_cny: p.price_cny,
        price_rub: p.price_rub,
        product: p.product.id
      })),
    });

    if (id) transformedData = { id, ...transformedData };

    // @ts-ignore
    transformedData = { individual_entrepreneur: individualEntrepreneur, ...transformedData };

    mutation(transformedData)
      .unwrap()
      .then(() => notifySuccess('Заказ был успешно сохранен'))
      .catch(() => notifyError('Заказ не был сохранен'));
  };

  public getStringDate = (order: IOrder | undefined): string => {
    if (order) return order.date;

    const date = new Date();

    return `${date.getHours()}:${date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  public formProductRows = (selectedProducts: IProductSpecs[]): IProductsRows[] => {
    return selectedProducts.map(selectedProduct => ({
      id: selectedProduct.product.id,
      quantity: selectedProduct.quantity,
      title: selectedProduct.product.title,
      article: selectedProduct.product.article,
      photo: selectedProduct.product.photo,
      price_cny: selectedProduct.price_cny,
      price_rub: selectedProduct.price_rub,
      additional_expenses: selectedProduct.additional_expenses
    }));
  };

  private getUndefinedProductsCount = (products: IProductSpecs[]) => {
    let undefinedProducts = 0;

    products.forEach(product => !product.price_cny || !product.price_rub || !product.quantity ? undefinedProducts + 1 : undefinedProducts);

    return undefinedProducts;
  };

  public handleSplitBill = (
    additional: TAdditional,
    selectedProducts: IProductSpecs[], setSelectedProducts: SetState<IProductSpecs[]>,
    setDialogContent: SetState<string>,
    setDialogOpen: SetState<boolean>,
  ) => {
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
        additional_expenses: Math.round(totalExpenses / prev.length)
      };
    }));

    let undefinedProducts = this.getUndefinedProductsCount(selectedProducts);

    setDialogContent(`У Вас есть 5 секунд, чтобы принять решение, иначе произойдет переход на следующий статус. Количество незаполненных товаров: ${undefinedProducts}`);
    setDialogOpen(true);
  };

  public skipSplittingBill = (
    additional: TAdditional,
    selectedProducts: IProductSpecs[], setSelectedProducts: SetState<IProductSpecs[]>,
    setDialogContent: SetState<string>,
    setDialogOpen: SetState<boolean>,
  ) => {
    if (!additional.course) return notifyError('Не указан курс');

    let undefinedProducts = this.getUndefinedProductsCount(selectedProducts);

    setDialogContent(`У Вас есть 5 секунд, чтобы принять решение, иначе произойдет переход на следующий статус. Количество незаполненных товаров: ${undefinedProducts}`);
    setDialogOpen(true);
  };
}

export const orderService = new OrderService();
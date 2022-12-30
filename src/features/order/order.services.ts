import { IProductsRows } from '../../components/screens/China/Order/components/Products/types'
import { IOrderForm, TAdditional } from '../../components/screens/China/types'
import { AnyObject } from '../../utils/types'
import {
  ICreateUpdateOrder,
  IOrder,
  IOrderRows,
  IProductSpecs,
  IStatus,
  PartialOrder
} from './order.types'

class OrderService {
  public transformData = (data: IOrderForm): ICreateUpdateOrder => {
    const resultData: AnyObject = {}

    Object.entries(data).map(d => {
      const [key, value] = d

      const intValue = parseInt(value)

      resultData[key] = isNaN(intValue) || Array.isArray(value) ? value : intValue
    })

    return resultData as ICreateUpdateOrder
  }

  public transformOrder = (
    order: IOrder | undefined,
    nextStatus: IStatus | undefined,
    selectedProducts: IProductSpecs[],
    additional: TAdditional
  ): PartialOrder => {
    if (selectedProducts.length === 0) return {} as PartialOrder

    const { additional_expenses, price_cny, price_rub, quantity } = selectedProducts.reduce(
      (prev, current) => ({
        ...prev,
        price_cny: prev.price_cny + current.price_cny,
        price_rub: prev.price_rub + current.price_rub,
        quantity: prev.quantity + current.quantity,
        additional_expenses: prev.additional_expenses + current.additional_expenses
      })
    )

    if (!order) return {} as PartialOrder

    return {
      id: order.id,
      status: nextStatus ? nextStatus.id : order.status.id,
      products: selectedProducts.map(product => ({ ...product, product: product.product.id })),
      total_cny: price_cny,
      total_rub: price_rub,
      total_quantity: quantity,
      total_expenses: additional_expenses,
      course: additional.course,
      expenses_cny: additional.expensesCny,
      expenses_rub: additional.expensesRub
    }
  }

  public formRows = (data: IOrder[]): IOrderRows[] =>
    data.map(d => ({
      id: d.id,
      individual_entrepreneur: d.individual_entrepreneur.individual_entrepreneur,
      china_distributor: d.china_distributor.china_distributor,
      order_for_project: d.order_for_project.project,
      status: d.status.status
    }))

  public transformSubmitData = (data: IOrderForm, selectedProducts: IProductSpecs[]) => {
    return orderService.transformData({
      ...data,
      products: selectedProducts.map(p => ({
        quantity: p.quantity,
        price_cny: p.price_cny,
        price_rub: p.price_rub,
        product: p.product.id
      })),
      documents: data.documents
    })
  }

  public formProductRows = (selectedProducts: IProductSpecs[]): IProductsRows[] => {
    return selectedProducts.map(selectedProduct => ({
      id: selectedProduct.product.id,
      quantity: selectedProduct.quantity,
      title: selectedProduct.product.title,
      article: selectedProduct.product.article,
      size: selectedProduct.product.size,
      color: selectedProduct.product.color,
      photo: selectedProduct.product.photo ?? undefined,
      price_cny: selectedProduct.price_cny,
      price_rub: selectedProduct.price_rub,
      additional_expenses: selectedProduct.additional_expenses
    }))
  }
}

export const orderService = new OrderService()

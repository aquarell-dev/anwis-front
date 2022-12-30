import { IOrder } from "../../../../features/order/order.types";
import { getDateDiff } from "../../../../utils";

type OrderInfo = { label: string; value: string | number | undefined };

export const fill = (order: IOrder): OrderInfo[] => [
  {
    label: "Компания",
    value: order.individual_entrepreneur.individual_entrepreneur,
  },
  {
    label: "Посредник",
    value: order.china_distributor.china_distributor,
  },
  {
    label: "Кол-во товаров",
    value: order.total_quantity,
  },
  {
    label: "Сумма ¥",
    value: order.total_cny,
  },
  {
    label: "Сумма, ₽",
    value: order.total_rub,
  },
  {
    label: "Курс",
    value: order.course,
  },
  {
    label: "Доп Затраты, ₽",
    value: order.total_expenses,
  },
  {
    label: "Дней До Изготовления Товара",
    value: order.ready_date
      ? getDateDiff(new Date(), new Date(order.ready_date)) > 0
        ? getDateDiff(new Date(), new Date(order.ready_date))
        : "Товар Изготовлен ✅"
      : undefined,
  },
  {
    label: "Номер Карго",
    value: order?.cargo_number,
  },
  {
    label: "Объем, м3",
    value: order?.cargo_volume,
  },
  {
    label: "Общая сумма Доставки, $",
    value: order?.total_delivery,
  },
  {
    label: "Дата Отправки Из Китая",
    value: order.shipping_from_china_date,
  },
  {
    label: "Приблизительная Дата Приезда в Москву",
    value: order.in_moscow_date,
  },
];

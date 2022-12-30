import { FC, useCallback } from 'react'

import useNotifications from '../../../../../../hooks/useNotifications'
import useNotification from '../../../../../common/hooks/useNotification'
import useTasks from '../../../../../common/hooks/useTasks'
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder'

import { IOrder, ITask } from '../../../../../../features/order/order.types'
import Notification from '../../../../../common/Notification'
import Tasks from '../../../../../common/Tasks'

const ChinaNotification: FC<{ order?: IOrder }> = ({ order }) => {
  const { notification, setDateTime, setNotification, dateTime, formatDateTime } = useNotification()

  const { notifyError } = useNotifications()

  const { updateOrder, isLoading: orderLoading } = useUpdatePartialOrder()

  const getTasks = useTasks()

  const getTaskProps = useCallback((tasks?: ITask[]) => getTasks(tasks), [order])

  return (
    <>
      <Notification
        notification={notification}
        setNotification={setNotification}
        dateTime={dateTime}
        setDateTime={setDateTime}
        onTaskCreate={() => {
          if (!order) return notifyError('Заказ не был обновлен')

          updateOrder({
            id: order.id,
            tasks: [
              ...order.tasks.map(t => ({ ...t, datetime: formatDateTime(t.datetime) })),
              { datetime: dateTime.format('YYYY-MM-DDTHH:mm'), task: notification }
            ]
          })
        }}
      />
      <Tasks
        taskProps={getTaskProps(order?.tasks)}
        onTaskDelete={task => {
          if (order)
            updateOrder({
              id: order.id,
              tasks: order.tasks
                .filter(t => t.id !== task.id)
                .map(t => ({
                  ...t,
                  datetime: formatDateTime(t.datetime)
                }))
            })
        }}
        loading={orderLoading}
      />
    </>
  )
}

export default ChinaNotification

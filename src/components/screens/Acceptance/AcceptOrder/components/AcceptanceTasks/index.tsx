import { FC, useCallback } from 'react'

import useNotification from '../../../../../common/hooks/useNotification'
import useTasks from '../../../../../common/hooks/useTasks'
import useUpdatePartialAcceptance from '../../../hooks/useUpdatePartialAcceptance'

import { Acceptance } from '../../../../../../types/acceptance.types'
import Notification from '../../../../../common/Notification'
import Tasks from '../../../../../common/Tasks'
import { Task } from '../../../../../common/common.types'

const AcceptanceTasks: FC<{ acceptance?: Acceptance }> = ({ acceptance }) => {
  const { dateTime, setDateTime, notification, setNotification, formatDateTime } = useNotification()

  const { updatePartialAcceptance, updateLoading } = useUpdatePartialAcceptance()

  const tasksProps = useTasks()

  const getTasksProps = useCallback((tasks?: Task[]) => tasksProps(tasks), [acceptance])

  return (
    <div className='flex flex-col space-y-4 py-8 border-t border-b border-slate-800'>
      <Notification
        notification={notification}
        setNotification={setNotification}
        dateTime={dateTime}
        setDateTime={setDateTime}
        onTaskCreate={async () => {
          if (!acceptance) return

          await updatePartialAcceptance({
            id: acceptance.id,
            tasks: [
              ...acceptance.tasks.map(t => ({ ...t, datetime: formatDateTime(t.datetime) })),
              { datetime: dateTime.format('YYYY-MM-DDTHH:mm'), task: notification }
            ]
          })
        }}
      />
      <Tasks
        taskProps={getTasksProps(acceptance?.tasks)}
        onTaskDelete={async task => {
          if (!acceptance) return
          await updatePartialAcceptance({
            id: acceptance.id,
            tasks: acceptance.tasks
              .filter(t => t.id !== task.id)
              .map(t => ({ ...t, datetime: formatDateTime(t.datetime) }))
          })
        }}
        loading={updateLoading}
      />
    </div>
  )
}

export default AcceptanceTasks

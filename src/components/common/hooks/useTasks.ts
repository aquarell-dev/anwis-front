import { convertDateToUSFormat, getDateDiff } from '../../../utils'
import { Task } from '../common.types'

const useTasks = () => {
  const getTasks = (tasks?: Task[]) => {
    let finishedTasks: Task[] = []
    let inProcessTasks: Task[] = []
    let scheduledTasks: Task[] = []

    tasks?.forEach(task => {
      const diff = getDateDiff(convertDateToUSFormat(task.datetime.split(' ')[1]), new Date())

      if (diff >= 1) return (scheduledTasks = [...scheduledTasks, task])

      if (Math.abs(diff) === 0) return (inProcessTasks = [...inProcessTasks, task])

      return (finishedTasks = [...finishedTasks, task])
    })

    return [
      {
        tasks: finishedTasks,
        title: 'Завершенные Задачи',
        deletable: true
      },
      {
        tasks: inProcessTasks,
        title: 'Задачи в Процессе',
        deletable: true
      },
      {
        tasks: scheduledTasks,
        title: 'Запланированные задачи',
        deletable: true
      }
    ]
  }

  return getTasks
}

export default useTasks

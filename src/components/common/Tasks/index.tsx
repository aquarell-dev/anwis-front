import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { Task } from '../common.types'

export type TasksProps = {
  title: string
  deletable?: boolean
  tasks: Task[]
}

export const TasksList: FC<
  TasksProps & {
    onTaskDelete?: (task: Task) => void
    loading?: boolean
  }
> = ({ tasks, title, deletable, onTaskDelete, loading }) => {
  return (
    <div className='flex flex-col space-y-4 px-4 h-full border-l border-r border-slate-600'>
      {!!tasks && <h3 className='border-b border-slate-500'>{title}</h3>}
      {loading && (
        <SpinnerComponent
          loading={true}
          position={'centered'}
          backgroundColor='#f1f5f9'
        />
      )}
      {!!tasks &&
        tasks.map(task => (
          <div
            className='flex items-center space-x-2'
            key={task.id}
          >
            <p>{task.task}</p>
            <p>-</p>
            <p>{task.datetime}</p>
            {deletable && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 transition ease-in-out'
                onClick={() => onTaskDelete && onTaskDelete(task)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            )}
          </div>
        ))}
    </div>
  )
}

const Tasks: FC<{
  onTaskDelete?: (task: Task) => void
  taskProps: TasksProps[]
  loading?: boolean
}> = ({ onTaskDelete, taskProps, loading }) => {
  return (
    <div className='flex w-full space-x-8 items-start h-full'>
      {taskProps.map((prop, idx) => (
        <TasksList
          key={idx}
          tasks={prop.tasks}
          title={prop.title}
          deletable={prop.deletable}
          onTaskDelete={onTaskDelete}
          loading={loading}
        />
      ))}
    </div>
  )
}

export default Tasks

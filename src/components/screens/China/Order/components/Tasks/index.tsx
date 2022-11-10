import React, { FC } from 'react';
import { IOrder, ITask } from '../../../../../../features/order/order.types';
import { getDateDiff } from '../../../../../../utils';
import useUpdatePartialOrder from '../../../hooks/useUpdatePartialOrder';
import { SpinnerComponent } from 'react-element-spinner';

const TaskList: FC<{
  tasks: ITask[],
  order?: IOrder,
  title: string,
  deletable?: boolean
}> = ({ tasks, order, title, deletable }) => {
  const { updateOrder, isLoading } = useUpdatePartialOrder();

  return (
    <div className="flex flex-col space-y-4 px-4 h-full border-l border-r border-slate-600">
      {!!tasks && <h3 className='border-b border-slate-500'>{title}</h3>}
      <SpinnerComponent
        loading={isLoading}
        position={'centered'}
        backgroundColor='#f1f5f9'
      />
      {!!tasks && tasks.map(task => (
        <div
          className="flex items-center space-x-2"
          key={task.id}
        >
          <p>{task.task}</p>
          <p>-</p>
          <p>{task.datetime}</p>
          {deletable && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 transition ease-in-out"
              onClick={() => {
                if (order)
                  updateOrder({
                    id: order.id,
                    tasks: tasks.filter(t => t.id !== task.id).map(t => ({
                      ...t,
                      datetime: new Date(t.datetime).toISOString()
                    }))
                  });
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

const Tasks: FC<{ order?: IOrder }> = ({ order }) => {
  let finishedTasks: ITask[] = [];
  let inProcessTasks: ITask[] = [];
  let scheduledTasks: ITask[] = [];

  order?.tasks?.forEach(task => {
    const diff = getDateDiff(new Date(), new Date(task.datetime.split(' ')[1]));

    console.log(task.task, diff);

    if (diff > 1) return finishedTasks = [...finishedTasks, task];
    if (diff < -1) return scheduledTasks = [...scheduledTasks, task];

    inProcessTasks = [...inProcessTasks, task];
  });

  return (
    <div className='flex w-full space-x-8 items-start h-full'>
      <TaskList
        tasks={scheduledTasks}
        title='Запланированные Задачи'
        deletable
        order={order}
      />
      <TaskList
        tasks={inProcessTasks}
        title='Задачи В Процессе'
      />
      <TaskList
        tasks={finishedTasks}
        title='Выполненные Задачи'
      />
    </div>
  );
};

export default Tasks;

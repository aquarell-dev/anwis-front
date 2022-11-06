import React, { useState } from 'react';

import { useCreateTaskMutation, useListTasksQuery } from '../../../../../../store/api/task.api';
import useNotifications from '../../../../../../hooks/useNotifications';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Expand from 'react-expand-animated';

import moment from 'moment';

import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { IndigoButton } from '../../../../../ui/Button';
import { Input } from '../../../../../ui/Input';


const animatedComponents = makeAnimated();

// had to use js cause were unable to find types for the expand lib

const Notification = ({order, control}) => {
  const [notification, setNotification] = useState('');
  const [taskCreateOpen, setTaskCreateOpen] = useState(false);
  const [dateTime, setDateTime] = useState(moment(new Date('00:00 01/01/2023')).format('YYYY-MM-DDThh:mm'));
  const [hasMenuBeenOpened, setMenuBeenOpened] = useState(false);

  const [createTask, {isLoading}] = useCreateTaskMutation();

  const {notifySuccess, notifyError} = useNotifications();

  const {data, error} = useListTasksQuery(null);

  if (error) return <p>Error...</p>;

  if (!data) return <p>Loading</p>;

  const options = data.map(d => ({label: `${d.task}(${d.datetime})`, value: d.id}));
  const defaultValue = order && order.tasks.map(task => ({label: `${task.task}(${task.datetime})`, value: task.id}));

  return (
    <>
      {data && (
        <div className='z-[40] flex flex-col space-y-4'>
          <div className="flex items-center space-x-4">
            <div className="w-[550px]">
              <Controller
                control={control}
                name={'tasks'}
                render={({field: {onChange, ref, value}}) => (
                  <Select
                    ref={ref}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder={'Задачи'}
                    isMulti
                    onMenuOpen={() => setMenuBeenOpened(true)}
                    value={hasMenuBeenOpened ? options.find((c) => c.value === value) : defaultValue}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    options={options}
                  />
                )}
              />
            </div>
            <IndigoButton
              type={'button'}
              text={taskCreateOpen ? 'Закрыть' : 'Новая задача'}
              customWidth={'w-60'}
              handler={() => setTaskCreateOpen(prev => !prev)}
            />
          </div>
          <Expand open={taskCreateOpen}>
            <div className="flex items-center space-x-4">
              <div className="w-60">
                <Input
                  value={notification}
                  handler={e => setNotification(e.target.value)}
                  placeholder={'Новая задача...'}
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  className='w-96'
                  renderInput={(props) => <TextField {...props} />}
                  label="Дата и время"
                  value={dateTime}
                  onChange={(newValue) => {
                    setDateTime(newValue);
                  }}
                  inputFormat={'hh:mm DD/MM/yyyy'}
                />
              </LocalizationProvider>
              <IndigoButton
                type={'button'}
                text={'Создать'}
                customWidth={'w-60'}
                handler={() => {
                  setTaskCreateOpen(false);
                  createTask({task: notification, datetime: dateTime})
                    .unwrap()
                    .then(() => notifySuccess('Задача успешно создана'))
                    .catch(() => notifyError('Задача не создана'));
                }}
              />
            </div>
          </Expand>
        </div>
      )}
    </>
  );
};

export default Notification;
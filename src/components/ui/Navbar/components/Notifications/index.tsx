import { FC, useRef } from 'react';

import { SetState } from '../../../../../utils/types';

import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { useOutside } from '../../../../../hooks/useOutside';
import { Alert } from '@mui/material';

const Notifications: FC<{ open: boolean, setOpen: SetState<boolean> }> = ({ open, setOpen }) => {
  const { notifications } = useTypedSelector(state => state.notifications);

  const ref = useRef(null);
  useOutside(ref, () => setOpen(false), 'notificationException');

  return (
    <>
      {open && (
        <div
          style={{
            top: '4.1rem'
          }}
          ref={ref}
          className='absolute h-96 flex flex-col z-[200] overflow-y-auto space-y-2 p-1 w-80 bg-white text-slate-800 rounded-b-lg shadow-lg'
        >
          {notifications.map((notification, idx) => (
            <Alert
              severity={notification.status}
              key={idx}
              sx={{ padding: '.7rem' }}
              className='relative'
            >
              <p>{notification.content}</p>
              <p className='absolute bottom-0 right-0 text-slate-500 text-sm text-right'>{notification.datetime}</p>
            </Alert>
          ))}
        </div>
      )}
    </>
  );
};

export default Notifications;

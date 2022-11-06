import { toast } from 'react-toastify';
import { useActions } from './useActions';
import { getCurrentDateTime } from '../utils';

const useNotifications = () => {
  const { createNotification } = useActions();

  const notifySuccess = (str: string) => {
    createNotification({ content: str, datetime: getCurrentDateTime(), status: 'success' });

    toast.success(str, {
      position: 'top-right',
      autoClose: 5000
    });
  };

  const notifyError = (str: string) => {
    createNotification({ content: str, datetime: getCurrentDateTime(), status: 'error' });

    toast.error(str, {
      position: 'top-right',
      autoClose: 5000
    });
  };

  return { notifyError, notifySuccess };
};

export default useNotifications;
import { toast } from 'react-toastify';

export const notifySuccess = (str: string) => {
  toast.success(str, {
    position: 'top-right',
    autoClose: 5000
  });
};

export const notifyError = (str: string) => {
  toast.error(str, {
    position: 'top-right',
    autoClose: 5000
  });
};
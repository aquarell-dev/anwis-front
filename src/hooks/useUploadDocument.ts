import { axiosUpload } from '../utils/axios';
import { AxiosResponse } from 'axios';
import { TDocument } from '../features/documents/document.types';
import { useActions } from './useActions';
import useNotifications from './useNotifications';

const useUploadDocument = (type: 'document' | 'photo') => {
  const { newDocument } = useActions();
  const { notifyError } = useNotifications();

  const create = (file: File): Promise<AxiosResponse<TDocument, any>> => {
    const formData = new FormData();

    formData.append(type, file, file.name);

    return axiosUpload.post<TDocument>(
      type + '/',
      formData
    )
      .then(res => newDocument(res.data))
      .catch(err => { notifyError('Картинка не добавлена'); return err; } );
  };

  return { create };
};

export default useUploadDocument;
import { axiosUpload } from '../utils/axios';
import { AxiosResponse } from 'axios';
import { TDocument } from '../features/documents/document.types';
import { useActions } from './useActions';
import useNotifications from './useNotifications';
import { useState } from 'react';

const useUploadDocument = (type: 'document' | 'photo') => {
  const { newDocument } = useActions();
  const { notifyError } = useNotifications();

  const [isLoading, setLoading] = useState(false);

  const create = (file: File): Promise<AxiosResponse<TDocument, any>> => {
    const formData = new FormData();

    setLoading(true);

    formData.append(type, file, file.name);

    return axiosUpload.post<TDocument>(
      type + '/',
      formData
    )
      .then(res => { newDocument(res.data); setLoading(false); })
      .catch(err => { notifyError('Картинка не добавлена'); setLoading(false); return err; } );
  };

  return { create, isLoading };
};

export default useUploadDocument;
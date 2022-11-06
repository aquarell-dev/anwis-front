import { axiosUpload } from '../utils/axios';

const useUploadDocument = (type: 'document' | 'photo') => {
  const create = (file: File | undefined) => {
    const formData = new FormData();

    if (!file) return;

    formData.append(type, file, file.name);

    return axiosUpload.post<{ id: number }>(
      type + '/',
      formData
    )
      .then(res => res)
      .catch(err => err);
  };

  return { create };
};

export default useUploadDocument;
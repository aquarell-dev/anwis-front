import { useContext } from 'react';
import { ImagePreviewContext } from '../index';

const useImagePreview = () => {
  const context = useContext(ImagePreviewContext);

  return { ...context };
};

export default useImagePreview;

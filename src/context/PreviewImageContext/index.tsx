import { createContext, FC, ReactNode, useState } from 'react'
import { SetState } from '../../utils/types';

type ImagePreviewContext = {
  imagePreviewOpen: boolean,
  setImagePreviewOpen: SetState<boolean>,
  imageSrc: string;
  setImageSrc: SetState<string>;
};

export const ImagePreviewContext = createContext<ImagePreviewContext>({} as ImagePreviewContext);

const ImagePreviewContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  return (
    <ImagePreviewContext.Provider value={{
      imagePreviewOpen,
      setImagePreviewOpen,
      imageSrc,
      setImageSrc
    }}>
      {children}
    </ImagePreviewContext.Provider>
  );
};

export default ImagePreviewContextProvider;

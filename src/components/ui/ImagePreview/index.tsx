import { FC, useRef } from 'react'

import useImagePreview from '../../../context/PreviewImageContext/hooks/useImagePreview'
import { useOutside } from '../../../hooks/useOutside'

import { AbsoluteCenteredContainer } from '../Container'

const ImagePreview: FC<{ src: string; alt: string }> = ({ alt, src }) => {
  const { setImagePreviewOpen, setImageSrc } = useImagePreview()

  return (
    <>
      <div className='wrapper'>
        <img
          alt={alt}
          src={src}
          onClick={() => {
            setImageSrc(src)
            setImagePreviewOpen(true)
          }}
          className='main_img'
        />
        <img
          alt={alt}
          src={src}
          className='hover_img'
        />
      </div>
    </>
  )
}

export const BigImage: FC = () => {
  const { setImagePreviewOpen, imagePreviewOpen, imageSrc } = useImagePreview()

  const ref = useRef(null)
  useOutside(ref, () => setImagePreviewOpen(false))

  return (
    <>
      {imagePreviewOpen && (
        <div
          className='fixed w-screen h-screen z-[1002]'
          style={{ backdropFilter: 'blur(3px)' }}
        >
          <AbsoluteCenteredContainer>
            <div className='w-full p-2'>
              <div className='w-6 h-6 absolute flex items-center justify-center right-0 top-0 bg-rose-800 cursor-pointer rounded-full hover:bg-rose-700 transition duration-300 ease-in-out'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  style={{ flex: '0 0 auto' }}
                  className='w-6 h-6 text-white transition duration-300 ease-in-out'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>
              <img
                ref={ref}
                src={imageSrc}
                alt={'Фото'}
                className='min-w-[320px] max-w-[450px]'
              />
            </div>
          </AbsoluteCenteredContainer>
        </div>
      )}
    </>
  )
}

export default ImagePreview

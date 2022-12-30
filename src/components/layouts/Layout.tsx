import { FC, ReactNode } from 'react'

import useAuth from '../../hooks/useAuth'

import GridLoadingContextProvider from '../../context/GridLoadingContext'
import ImagePreviewContextProvider from '../../context/PreviewImageContext'
import { BigImage } from '../ui/ImagePreview'
import Navbar from '../ui/Navbar'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuth } = useAuth()

  return (
    <div className='min-h-screen'>
      <Navbar />
      <GridLoadingContextProvider>
        <ImagePreviewContextProvider>
          <BigImage />
          {children}
        </ImagePreviewContextProvider>
      </GridLoadingContextProvider>
    </div>
  )
}

export default Layout

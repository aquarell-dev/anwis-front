import { FC } from 'react'

// import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import GridLoadingContextProvider from '../../context/GridLoadingContext'
import ImagePreviewContextProvider from '../../context/PreviewImageContext'
import { BigImage } from '../ui/ImagePreview'
import Navbar from '../ui/Navbar'

const Layout: FC = () => {
  const { isAuth } = useAuth()

  return (
    <div className='min-h-screen'>
      <Navbar />
      {/*<GridLoadingContextProvider>*/}
      {/*  <ImagePreviewContextProvider>*/}
      {/*    <BigImage />*/}
      {/*    <Outlet />*/}
      {/*  </ImagePreviewContextProvider>*/}
      {/*</GridLoadingContextProvider>*/}
    </div>
  )
}

export default Layout

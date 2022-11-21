import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

import ImagePreviewContextProvider from '../../context/PreviewImageContext'
import { BigImage } from '../ui/ImagePreview'
import Navbar from '../ui/Navbar'

const Layout: FC = () => {
  const { isAuth } = useAuth()

  return (
    <div className='min-h-screen'>
      <Navbar />
      <ImagePreviewContextProvider>
        <BigImage />
        <Outlet />
      </ImagePreviewContextProvider>
    </div>
  )
}

export default Layout

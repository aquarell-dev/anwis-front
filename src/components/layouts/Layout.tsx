import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '../ui/Navbar';

import useAuth from '../../hooks/useAuth';
import ImagePreviewContextProvider from '../../context/PreviewImageContext';
import { BigImage } from '../screens/China/components/ImagePreview';

const Layout: FC = () => {
  const { isAuth } = useAuth();


  return <div
    className='min-h-screen'
  >
    <Navbar/>
    <ImagePreviewContextProvider>
      <BigImage />
      <Outlet/>
    </ImagePreviewContextProvider>
  </div>;
};

export default Layout;

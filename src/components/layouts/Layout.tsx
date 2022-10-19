import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '../ui/Navbar';
import Sidebar from '../ui/Sidebar';

import useAuth from '../../hooks/useAuth';

const Layout: FC = () => {
  const { isAuth } = useAuth();

  return <div className='min-h-screen'>
    <Navbar />
    {isAuth && <Sidebar />}
    <Outlet />
  </div>
};

export default Layout;

import { FC } from 'react';

import { Button } from '../Button';

import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useActions';


const Navbar: FC = () => {
  const { isAuth } = useAuth();

  const { logOut } = useActions();

  const navigate = useNavigate();

  return (
    <div className='h-16 bg-indigo-600 shadow-md py-2 px-4 flex items-center justify-between text-white'>
      <h1 className='font-medium text-2xl'>
        <Link to='/'>
          Anwis Dashboard
        </Link>
      </h1>
      {isAuth && (
        <Button type={'submit'} text={'Выйти'} handler={() => {logOut(); navigate('/') }} />
      )}
    </div>
  );
};

export default Navbar;

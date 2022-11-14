import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SubNavbar from '../../ui/SubNavbar';
import { ISubNavElement } from '../../ui/SubNavbar/types';

export const Layout: FC = () => {
  const elements: ISubNavElement[] = [
    {
      title: 'Приемка',
      link: '/acceptance/acceptances'
    },
    {
      title: 'Товары',
      link: '/acceptance/products'
    },
    {
      title: 'Упаковки',
      link: '/acceptance/packages'
    },
    {
      title: 'Сотрудники',
      link: '/acceptance/staff'
    }
  ];

  return (
    <div className="mx-8">
      <SubNavbar elements={elements} />
      <Outlet />
    </div>
  );
};

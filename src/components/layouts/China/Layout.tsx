import { FC } from 'react';
import SubNavbar from '../../ui/SubNavbar';
import { ISubNavElement } from '../../ui/SubNavbar/types';

import { Outlet } from 'react-router-dom';

const elements: ISubNavElement[] = [
  {
    title: 'Заказы',
    link: '/china/orders'
  },
  {
    title: 'Создать новый заказ',
    link: '/china/new-order'
  },
  {
    title: 'Китайские товары',
    link: '/china/products'
  },
  {
    title: 'Заказы в архиве',
    link: '/china/archive'
  },
  {
    title: 'Остатки',
    link: '/china/leftover'
  },
  {
    title: 'Дополнительно',
    link: '/china/additional'
  }
];

export const Layout: FC = () => {
  return (
    <div>
      <SubNavbar elements={elements} />
      <Outlet />
    </div>
  );
};

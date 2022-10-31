import { FC } from 'react';
import { SidebarContainer } from '../../ui/Container';
import SubNavbar from '../../ui/SubNavbar';
import { ISubNavElement } from '../../ui/SubNavbar/types';

import { Outlet } from 'react-router-dom';

const elements: ISubNavElement[] = [
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
];

export const Layout: FC = () => {

  return (
    <SidebarContainer>
      <SubNavbar elements={elements} />
      <Outlet />
    </SidebarContainer>
  )
};

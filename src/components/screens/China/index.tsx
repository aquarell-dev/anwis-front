import { FC } from 'react';

import { SidebarContainer } from '../../ui/Container';
import SubNavbar from '../../ui/SubNavbar';
import { ISubNavElement } from '../../ui/SubNavbar/types';

const elements: ISubNavElement[] = [
  {
    title: 'Создать новый заказ',
    link: '/china/new-order'
  },
  {
    title: 'Китайские товары',
    link: '/china/products'
  },
];

const China: FC = () => {

  return (
    <SidebarContainer>
      <SubNavbar elements={elements} />
    </SidebarContainer>
  )
};

export default China;

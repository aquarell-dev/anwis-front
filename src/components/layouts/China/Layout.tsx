import { FC, ReactNode } from 'react'

import SubNavbar from '../../ui/SubNavbar'
import { ISubNavElement } from '../../ui/SubNavbar/types'

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
]

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div>
      <SubNavbar elements={elements} />
      {children}
    </div>
  )
}

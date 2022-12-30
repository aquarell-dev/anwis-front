import { FC, ReactNode } from 'react'

import SubNavbar from '../../ui/SubNavbar'
import { ISubNavElement } from '../../ui/SubNavbar/types'

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  const elements: ISubNavElement[] = [
    {
      title: 'Приемки',
      link: '/acceptance/acceptances'
    },
    {
      title: 'Товары',
      link: '/acceptance/products'
    },
    {
      title: 'Упаковка',
      link: '/acceptance/packaging'
    },
    {
      title: 'Сотрудники',
      link: '/acceptance/staff'
    },
    {
      title: 'Фбо',
      link: '/acceptance/fbo'
    },
    {
      title: 'Отгрузки',
      link: '/acceptance/shippings'
    }
  ]

  return (
    <div className='mx-8'>
      <SubNavbar elements={elements} />
      {children}
    </div>
  )
}

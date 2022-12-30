export type ILink = {
  id: number
  title: string
  link: string
  subLinks?: ILink[]
}

export const links: ILink[] = [
  {
    id: 1,
    title: 'Китай',
    link: 'china/'
  },
  {
    id: 2,
    title: 'Приемка товара',
    link: 'acceptance/'
  },
  {
    id: 3,
    title: 'Настройки',
    link: 'settings/'
  }
]

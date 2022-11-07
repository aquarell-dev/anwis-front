export type ILink = {
  id: number,
  title: string,
  link: string,
  subLinks?: ILink[],
}

export const links: ILink[] = [
  {
    id: 1,
    title: 'Заказы поставщикам',
    link: 'china/',
  },
];
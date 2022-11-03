export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const getDateDiff = (biggerDate: Date, smallerDate: Date): number => Math.ceil(
  (biggerDate.getTime() - smallerDate.getTime()) / (1000 * 3600 * 24)
);

export const convertDateToUSFormat = (dateString: string) =>
  new Date(dateString.replace(/(\d+[/])(\d+[/])/, '$2$1'));

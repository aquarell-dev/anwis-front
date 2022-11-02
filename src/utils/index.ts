export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const getDateDiff = ({ biggerDate, smallerDate }: { biggerDate: Date, smallerDate: Date }): number => Math.ceil(
  (biggerDate.getTime() - smallerDate.getTime()) / (1000 * 3600 * 24)
);
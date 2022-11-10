export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const getDateDiff = (biggerDate: Date, smallerDate: Date): number => Math.ceil(
  (biggerDate.getTime() - smallerDate.getTime()) / (1000 * 3600 * 24)
);

export const convertDateToUSFormat = (dateString: string) =>
  new Date(dateString.replace(/(\d+[/])(\d+[/])/, '$2$1'));

export const getFourDigitId = (id?: number, space?: boolean) => id ? `${space ? '№ ' : '№'}` + '0'.repeat(4 - id.toString().length) + id.toString() : '';

export const getCurrentDateTime = () => `${new Date().toLocaleTimeString('en-GB')} ${new Date().toLocaleDateString('en-GB')}`;
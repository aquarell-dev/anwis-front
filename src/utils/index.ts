export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

export const getDateDiff = (biggerDate: Date, smallerDate: Date): number =>
  Math.ceil((biggerDate.getTime() - smallerDate.getTime()) / (1000 * 3600 * 24))

export const convertDateToUSFormat = (dateString: string) =>
  new Date(dateString.replace(/(\d+[/])(\d+[/])/, '$2$1'))

export const convertDateTimeToUSFormat = (dateTimeString: string) => {
  const [time, date] = dateTimeString.split(' ')
  const reformattedDate = date.replace(/(\\d+[/])(\\d+[/])/, '$2$1')
  console.log(convertDateToUSFormat(date))
  console.log(date, reformattedDate)
  return new Date(`${time} ${reformattedDate}`)
}

export const getFourDigitId = (id?: number, space?: boolean) =>
  id ? `${space ? '№ ' : '№'}` + '0'.repeat(4 - id.toString().length) + id.toString() : ''

export const getCurrentDateTime = () =>
  `${new Date().toLocaleTimeString('en-GB')} ${new Date().toLocaleDateString('en-GB')}`

export const getOnlySpecificKeys = <T extends object>(obj: T, keys: (keyof T)[]) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as keyof T)))

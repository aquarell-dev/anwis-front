import { FC } from 'react'

import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment from 'moment'
import 'moment/locale/ru'

import { SetState } from '../../../utils/types'

type TDateValue = moment.Moment

type DatePickerProps = {
  label: string
  value: TDateValue
  setValue?: SetState<TDateValue>
  customOnChange?: (value: TDateValue | null, keyboardInputValue?: string | undefined) => void
  customStyling?: string
}

export const CustomDatePicker: FC<DatePickerProps> = ({
  label,
  value,
  setValue,
  customOnChange,
  customStyling
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterMoment}
      adapterLocale={moment.locale('ru')}
    >
      <MuiDatePicker
        label={label}
        openTo='day'
        views={['year', 'month', 'day']}
        value={value}
        inputFormat={'DD/MM/YYYY'}
        className={customStyling}
        onChange={
          customOnChange
            ? value => customOnChange(value)
            : value => value && setValue && setValue(value)
        }
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export const CustomDateTimePicker: FC<DatePickerProps> = ({
  label,
  value,
  setValue,
  customOnChange,
  customStyling
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterMoment}
      adapterLocale={moment.locale('ru')}
    >
      <DateTimePicker
        className={customStyling}
        renderInput={props => <TextField {...props} />}
        label={label}
        value={value}
        openTo='day'
        onChange={
          customOnChange
            ? value => customOnChange(value)
            : value => value && setValue && setValue(value)
        }
        inputFormat={'HH:mm DD/MM/yyyy'}
      />
    </LocalizationProvider>
  )
}

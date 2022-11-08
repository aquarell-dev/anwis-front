import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { FC } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { SetState } from '../../../utils/types';

type TDateValue = moment.Moment;

type DatePickerProps = {
  label: string;
  value: TDateValue,
  setValue: SetState<TDateValue>,
  customOnChange?: (value: (TDateValue | null), keyboardInputValue?: (string | undefined)) => void;
};

export const CustomDatePicker: FC<DatePickerProps> = ({ label, value, setValue, customOnChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('ru')}>
      <MuiDatePicker
        label={label}
        openTo="day"
        views={['year', 'month', 'day']}
        value={value}
        inputFormat={'DD/MM/YYYY'}
        onChange={customOnChange ? (value) => customOnChange(value) : (value) => value && setValue(value)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

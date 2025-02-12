import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';
import React, { ForwardedRef } from 'react';
import { useController } from 'react-hook-form';

type TFDatePicker = {
  name: string;
  textFieldProps?: TextFieldProps;
  label?: string;
  inputFormat?: string;
  valueFormat?: string;
} & Omit<DatePickerProps<unknown, Dayjs | null>, 'onChange' | 'renderInput' | 'value'>;

const FDatePicker: React.FC<TFDatePicker> = React.forwardRef(
  ({ name, label, textFieldProps, inputFormat, readOnly, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    const { field, fieldState } = useController({ name, defaultValue: null });

    const handleOnChange = (date: Dayjs | null) => {
      date ? field.onChange(date?.format(props.valueFormat || 'DD/MM/YYYY')) : field.onChange(null);
    };

    const config = {
      ...field,
      ...props,
      label: label,
      fullWidth: true,
      inputFormat: inputFormat || 'DD/MM/YYYY',
      onChange: handleOnChange
    };

    const textFieldParams = ({ InputProps, ...params }: TextFieldProps) => {
      return {
        ...params,
        ...textFieldProps,
        name: field.name,
        error: !!fieldState.error,
        helperText: fieldState.error?.message,
        inputProps: {
          ...params.inputProps,
          ...textFieldProps?.inputProps,
          value: params?.inputProps?.value
        },
        InputProps: {
          ...InputProps,
          ...textFieldProps?.InputProps,
          endAdornment: !readOnly && InputProps?.endAdornment,
          startAdornment: !readOnly && InputProps?.startAdornment,
          readOnly,
          className: readOnly ? 'read-only' : undefined,
          disableUnderline: readOnly
        }
      };
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker {...config} renderInput={(params) => <TextField {...textFieldParams(params)} ref={ref} variant='standard' />} />
      </LocalizationProvider>
    );
  }
);

FDatePicker.displayName = 'FDatePicker';
export default FDatePicker;

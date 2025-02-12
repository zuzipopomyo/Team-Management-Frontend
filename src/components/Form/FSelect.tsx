import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

type TFSelect = TextFieldProps & {
  name: string;
  options: { id: string; value: string }[];
};

const FSelect: React.FC<TFSelect> = ({ name, options, ...otherProps }) => {
  const { field, fieldState } = useController({ name, defaultValue: '' });

  const handleChange = (e: TEvent) => {
    const { value } = e.target;
    field.onChange(value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    fullWidth: true,
    onChange: handleChange
  };

  if (fieldState && fieldState.isTouched && fieldState.error) {
    configSelect.error = true;
    configSelect.helperText = fieldState.error.message;
  }

  return (
    <TextField variant='outlined' {...configSelect}>
      {options.map((o, pos) => {
        return (
          <MenuItem key={pos} value={o.id}>
            {o.value}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default FSelect;

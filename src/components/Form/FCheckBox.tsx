import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

type TFCheckBox = {
  name: string;
  label: string;
  legend: string;
};

const FCheckBox: React.FC<TFCheckBox> = ({ name, label, legend }) => {
  const { field, fieldState } = useController({ name, defaultValue: false });

  const handleChange = (e: TEvent) => {
    const { checked } = e.target;
    field.onChange(checked);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange
  };

  const configFormControl = {
    error: false
  };

  if (fieldState && fieldState.isTouched && fieldState.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox {...configCheckbox} />} label={label} />
      </FormGroup>
    </FormControl>
  );
};

export default FCheckBox;

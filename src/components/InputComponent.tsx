// src/components/InputComponent.tsx
import { TextField, Typography } from '@mui/material';
import { Control, useController } from 'react-hook-form';

interface InputComponentProps {
  name: string;
  label: string;
  control: Control<any>;
  type?: string;
  rules?: object;
  fullWidth?: boolean;
  errorMessage?: string;
}

const InputComponent = ({ name, label, control, type = 'text', rules = {}, fullWidth = true }: InputComponentProps) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  return (
    <>
      <TextField {...field} label={label} type={type} variant='standard' fullWidth={fullWidth} value={field.value || ''} sx={{ mt: 2 }} />
      {error && <Typography color='error'>{error.message}</Typography>}
    </>
  );
};

export default InputComponent;

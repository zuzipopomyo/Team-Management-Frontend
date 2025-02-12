import { useToggle } from '@/hooks';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type TFTextInput = TextFieldProps & {
  name: string;
  renderStartAdornment?: any;
  renderEndAdornment?: any;
  showCount?: boolean;
  maxLength?: number;
  readOnly?: boolean;
};

const FTextInput: React.FC<TFTextInput> = ({
  name,
  renderEndAdornment,
  renderStartAdornment,
  showCount,
  maxLength = 150,
  readOnly,
  disabled,
  InputLabelProps,
  ...otherProps
}) => {
  const { field, fieldState } = useController({ name, defaultValue: '' });
  const [showPassword, toggleShowPassword] = useToggle();
  const isPasswordInput = otherProps.type === 'password';
  const isError = !!(fieldState && fieldState.error);

  const showMaxCount = maxLength && showCount ? <div style={{ float: 'right' }}>{`${field.value?.length}/${maxLength}`}</div> : null;

  const config = {
    ...otherProps,
    ...field,
    disabled: readOnly ? false : disabled,
    fullWidth: true,
    error: isError,
    helperText: (isError && fieldState.error?.message) || (!readOnly && showMaxCount),
    type: isPasswordInput ? (showPassword ? 'text' : 'password') : otherProps.type
  };

  const InputProps = {
    readOnly,
    className: readOnly ? 'read-only' : undefined,
    disableUnderline: readOnly,
    endAdornment: isPasswordInput ? (
      <InputAdornment position='end'>
        {/* <IconButton onClick={toggleShowPassword} icon={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />} /> */}
      </InputAdornment>
    ) : (
      renderEndAdornment && <InputAdornment position='end'>{renderEndAdornment}</InputAdornment>
    ),
    startAdornment: renderStartAdornment && <InputAdornment position='start'>{renderStartAdornment}</InputAdornment>,

    ...otherProps.InputProps
  };

  const _InputLabelProps = { ...InputLabelProps, style: { fontSize: '20px', ...InputLabelProps?.style } };

  return (
    <TextField
      variant='standard'
      {...config}
      InputProps={InputProps}
      InputLabelProps={_InputLabelProps}
      inputProps={{
        ...otherProps.inputProps,
        maxLength,
        placeholder: readOnly ? '-' : otherProps.inputProps?.placeholder
      }}
    />
  );
};

export default FTextInput;

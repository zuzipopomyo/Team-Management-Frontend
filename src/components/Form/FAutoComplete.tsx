import { usePrevious } from '@/hooks';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  TextField,
  TextFieldProps,
  UseAutocompleteProps
} from '@mui/material';
import React, { HtmlHTMLAttributes, SyntheticEvent, useEffect } from 'react';
import { useController } from 'react-hook-form';
export type TOptions = { value: string | number; label: string; group?: string; [key: string]: string | number | boolean | undefined };
type TFAutocomplete = UseAutocompleteProps<TOptions, undefined, boolean | undefined, undefined> &
  HtmlHTMLAttributes<Element> & {
    name: string;
    options: TOptions[];
    textFieldProps?: TextFieldProps;
    setDefaultValue?: TOptions;
    onSearch?: (e: TEvent) => void;
    loading?: boolean;
    renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: TOptions, state: AutocompleteRenderOptionState) => React.ReactNode;
    readOnly?: boolean;
    defaultFirst?: boolean;
    autoRemove?: boolean;
    noOptionsText?: string;
    onSelectChange?: (e: TOptions | null) => void;
  };

const FAutocomplete: React.FC<TFAutocomplete> = ({
  name,
  options,
  renderOption,
  textFieldProps,
  setDefaultValue,
  onSearch,
  readOnly,
  // placeholder,
  onSelectChange,
  defaultFirst,
  autoRemove = true,
  ...otherProps
}) => {
  const { field, fieldState } = useController({ name, defaultValue: setDefaultValue || null });

  const handleChange = (e: TOptions | null) => field.onChange(e);

  const config = {
    ...field,
    ...otherProps,
    readOnly,
    disableClearable: !!readOnly || otherProps.disableClearable,
    fullWidth: true,
    onChange: (_: SyntheticEvent<Element, Event>, value: TOptions | null) => {
      handleChange(value);
      onSelectChange?.(value);
    }
  };

  const isError = fieldState && fieldState.error;

  const textProps = ({ InputProps, disabled, InputLabelProps, ...p }: AutocompleteRenderInputParams) => ({
    ...textFieldProps,
    InputProps: {
      ...InputProps,
      ...textFieldProps?.InputProps,
      endAdornment: !readOnly && InputProps.endAdornment,
      startAdornment: !readOnly && InputProps.startAdornment,
      readOnly,
      className: readOnly ? 'read-only' : undefined,
      disableUnderline: readOnly,
      style: { padding: '12px 0px 6px' }
    },
    disabled: readOnly ? false : otherProps.disabled || disabled,
    InputLabelProps: { shrink: true, ...InputLabelProps, style: { fontSize: '20px', ...InputLabelProps?.style } },
    ...p
  });

  const prevOptions = usePrevious(options);

  const isUpdate = JSON.stringify(options) === JSON.stringify(prevOptions);

  useEffect(() => {
    if (defaultFirst && options.length && !field?.value) {
      field.onChange(options[0]);
    }

    if (autoRemove && !options.find((o) => o.value === field.value?.value)) {
      if (defaultFirst) {
        field.onChange(options[0]);
      } else {
        field.onChange(null);
      }
    }
  }, [isUpdate]);

  return (
    <Autocomplete
      sx={{
        '.MuiTextField-root': { margin: 0 },
        '.MuiAutocomplete-inputRoot': {
          marginTop: '15px'
        }
      }}
      {...config}
      options={options}
      value={field.value}
      getOptionLabel={(option) => option?.label || ''}
      renderOption={renderOption}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      // onInputChange={(_e, value) => onInputChange && onInputChange(value)}
      renderInput={(params) => (
        <TextField
          {...textProps(params)}
          error={!!isError}
          // placeholder={!readOnly ? placeholder : '-'}
          helperText={isError && fieldState?.error?.message}
          margin='normal'
          variant='standard'
          onChange={onSearch}
        />
      )}
    />
  );
};

export default FAutocomplete;

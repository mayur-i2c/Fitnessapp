import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const CustomInput = ({
  name,
  label,
  inputRef,
  InputProps,
  error,
  helperText,
  xs,
  sm,
  m,
  placeholder,
  id,
  defaultValue,
  readOnly,
  disabled,
  type,
  onChange // Add onChange prop
}) => {
  console.log(type);
  return (
    <Grid item xs={xs} sm={sm} m={m}>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        type={type ? type : 'text'}
        variant="outlined"
        margin="normal"
        fullWidth
        label={label}
        id={id}
        name={name}
        inputRef={inputRef}
        InputProps={InputProps}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange} // Handle onChange event
      />
    </Grid>
  );
};

export default CustomInput;

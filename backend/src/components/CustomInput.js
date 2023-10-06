import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const CustomInput = ({
  name,
  label,
  inputRef,
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
  onChange // Add onChange prop
}) => {
  return (
    <Grid item xs={xs} sm={sm} m={m}>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
        margin="normal"
        fullWidth
        label={label}
        id={id}
        name={name}
        inputRef={inputRef}
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

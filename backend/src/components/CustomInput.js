import React from 'react';
import TextField from '@mui/material';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';

const CustomInput = ({
  name,
  label,
  inputref,
  errors,
  sm,
  xs,
  multiline,
  rows,
  type,
  onchange,
  defaultValue,
  disabled,
  InputProps,
  placeholder
}) => (
  <Grid item xs={xs} sm={sm}>
    <TextField
      InputLabelProps={{
        shrink: true
      }}
      variant="outlined"
      defaultValue={defaultValue}
      margin="normal"
      fullWidth
      label={label}
      name={name}
      inputRef={inputref}
      error={Boolean(errors[name])}
      multiline={multiline}
      rows={rows}
      type={type}
      onChange={onchange}
      disabled={disabled}
      InputProps={InputProps}
      placeholder={placeholder}
    />
    <FormHelperText error>{errors[name] && errors[name].message}</FormHelperText>
  </Grid>
);

export default CustomInput;

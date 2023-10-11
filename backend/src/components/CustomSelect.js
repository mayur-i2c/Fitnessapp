import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';

const CustomSelect = ({ name, label, control, defaultValue, children, rule, xs, sm, errors, onChange, multiple }) => {
  return (
    <Grid item xs={xs} sm={sm}>
      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Controller
          as={
            <Select label={label} onChange={onChange}>
              {children}
            </Select>
          }
          name={name}
          control={control}
          defaultValue={defaultValue}
          error={Boolean(errors[name])}
          rules={rule}
          multiple={multiple}
        />
        <FormHelperText>{errors[name] && errors[name].message}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
export default CustomSelect;

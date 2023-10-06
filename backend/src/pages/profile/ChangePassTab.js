import PropTypes from 'prop-types';

import React, { useState } from 'react';

import { Button, FormHelperText, Grid, Typography, OutlinedInput, FormControl, CircularProgress, InputLabel, Fade } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import axios from "axios";
import { useForm } from 'react-hook-form';

import { changePassword } from '../../ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassTab = () => {
  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async (data, e) => {
    setIsLoading(true);
    console.log(data);
    changePassword(data)
      .then((response) => {
        if (response.data.status === 200 && response.data.isSuccess) {
          e.target.reset();
          console.log(response);
          toast.success(response.data.info);
          setIsLoading(false);
        } else {
          setError(response.data.messages);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if ((err.response.data.status === 401 || 400) && !err.response.data.isSuccess) toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fade in={error} mb={2}>
        <Typography color="#FF0000">{error ? error : ''}</Typography>
      </Fade>
      <ToastContainer />
      <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth error={!!errors.old_password}>
        <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
        <OutlinedInput
          fullWidth
          id="password"
          {...register('old_password', { required: true })}
          placeholder="Old Password"
          label="Old Password"
          name="old_password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors.old_password && 'Old Password is required'}</FormHelperText>
      </FormControl>

      <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth error={!!errors.new_password}>
        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
        <OutlinedInput
          fullWidth
          id="password"
          {...register('new_password', { required: true })}
          placeholder="New Password"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowNewPassword} edge="end">
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors.new_password && 'New Password is required'}</FormHelperText>
      </FormControl>

      <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth error={!!errors.confirm_password}>
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        <OutlinedInput
          fullWidth
          id="password"
          {...register('confirm_password', { required: true })}
          placeholder="Confirm Password"
          label="New Confirm Password"
          type={showNewConfirmPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} edge="end">
                {showNewConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors.confirm_password && 'Confirm Password is required'}</FormHelperText>
      </FormControl>

      <div>
        {isLoading ? (
          <Grid item xs={12} mt={2} style={{ 'text-align': 'center' }}>
            <CircularProgress size={26} fullWidth style={{ 'margin-top': '15px', float: 'right' }} />
          </Grid>
        ) : (
          <Button type="submit" variant="contained" color="primary" size="large" style={{ 'margin-top': '15px', float: 'right' }}>
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

ChangePassTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ChangePassTab;

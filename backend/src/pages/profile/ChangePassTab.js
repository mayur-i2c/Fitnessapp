import PropTypes from 'prop-types';

import React, {useState} from 'react';

import {
Button,
Grid,
Typography,
OutlinedInput,
FormControl,
CircularProgress,
InputLabel,
Fade 
} from  '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import axios from "axios";
// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { useForm } from "react-hook-form"

// import { adminLogin } from "../../../ApiServices";
import { useNavigate } from "react-router-dom";


const ChangePassTab = () => {
  let navigate = useNavigate();
  // global
  var userDispatch = useUserDispatch();
  
  // local
 var [isLoading, setIsLoading] = useState(false);
 var [error, setError] = useState("");
 const { register, handleSubmit } = useForm();
 const [showPassword, setShowPassword] = React.useState(false);
 const [showNewPassword, setShowNewPassword] = React.useState(false);
 const [showNewConfirmPassword, setShowConfirmPassword] = React.useState(false);



const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

const onSubmit = async (data) => {
 loginUser(userDispatch, data, navigate, setIsLoading, setError);
};
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

  <Fade in={error} mb={2}>
    <Typography color="#FF0000"  >
      {error ? error : ""}
    </Typography>
  </Fade>

  <FormControl  sx={{ mt: 2 }} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >Old Password</InputLabel>
    <OutlinedInput fullWidth id="password"
      {...register("old_password", { required: true })}
      placeholder="Old Password"
      label="Old Password"
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>


  <FormControl  sx={{ mt: 2 }} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >New Password</InputLabel>
    <OutlinedInput fullWidth id="password"
      {...register("new_password", { required: true })}
      placeholder="New Password"
      label="New Password"
      type={showNewPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowNewPassword}
            edge="end"
          >
            {showNewPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>

  <FormControl  sx={{ mt: 2 }} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >Confirm Password</InputLabel>
    <OutlinedInput fullWidth id="password"
      {...register("confirm_password", { required: true })}
      placeholder="Confirm Password"
      label="New Confirm Password"
      type={showNewConfirmPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowConfirmPassword}
            edge="end"
          >
            {showNewConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>

  <div>
  {isLoading ? (
                    <Grid item xs={12} mt={2} style={{'text-align':'center'}}>
                    <CircularProgress 
                      size={26}
                      fullWidth
                    /></Grid>
                  ) : (
                    <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{'margin-top':'15px','float':'right'}}
          > 
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

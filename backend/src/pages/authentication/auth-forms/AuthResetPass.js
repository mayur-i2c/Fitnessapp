import React, {useState} from 'react';

import {
Button,
TextField,
Typography,
OutlinedInput,
FormControl,
CircularProgress,
InputLabel,
Fade, 
Input,
Grid
} from  '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { useForm } from "react-hook-form"

import {  useParams } from "react-router-dom";
import { resetPassword } from "../../../ApiServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function  AuthLogin ()  {

 
  let navigate = useNavigate();
   // Access the dynamic parameters from the URL
  const { token, userid } = useParams();

   // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [newshowPassword, setnewShowPassword] = React.useState(false);
  const [conshowPassword, setconShowPassword] = React.useState(false);

const handleClicknewShowPassword = () => setnewShowPassword((show) => !show);
const handleClickconshowPassword = () => setconShowPassword((show) => !show);

const onSubmit = async(data) => {
  setError("");
  setIsLoading(true);
  console.log(data);
  resetPassword(data)
    .then((response) => {
      if (
        response.data.isSuccess === 400 ||
        response.data.isSuccess === false
      ) {
        setError(response.data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.success(response.data.info);
        navigate("/");
      }
    })
    .catch((err) => {
      if (err.response.data.status === 401 || !err.response.data.isSuccess) {        
        setError(err.response.data.message);
        setIsLoading(false);
      } else {
        setError("Something is wrong!");
        setIsLoading(false);
      }
    });
};


return (

<form onSubmit={handleSubmit(onSubmit)}>
<Typography variant="h4" align="center">Reset Your Password</Typography>
  <Fade in={error} mt={2}>
    <Typography color="#FF0000"  >
      {error ? error : ""}
    </Typography>
  </Fade>
  <ToastContainer />
  <Input
    {...register("id", { required: true })}
    type="hidden"
    value={userid} 
  />

<Input
    {...register("resetCode", { required: true })}
    type="hidden"
    value={token} 
  />

  <TextField
    id="otp"
    {...register("otp", { required: true })}
    margin="normal"
    placeholder="OTP"
    type="text"
    label="OTP" 
    fullWidth
  />
  <FormControl  sx={{ mt: 1 }} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >New Password</InputLabel>
    <OutlinedInput fullWidth id="new_password"
      {...register("new_password", { required: true })}
      placeholder="New Password"
      label="New Password"
      type={newshowPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClicknewShowPassword}
            edge="end" >
            {newshowPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>

  <FormControl  sx={{ mt: 2, mb:2}} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >Confirm Password</InputLabel>
    <OutlinedInput fullWidth id="confirm_password"
      {...register("confirm_password", { required: true })}
      placeholder="Confirm Password"
      label="Confirm Password"
      type={conshowPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickconshowPassword}
            edge="end" >
            {conshowPassword ? <VisibilityOff /> : <Visibility />}
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
                     
                    /></Grid>
                  ) : (
                    <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth> 
          Reset Password
      </Button>
                  )}

      
  </div>           
</form>
);
}

export default AuthLogin;

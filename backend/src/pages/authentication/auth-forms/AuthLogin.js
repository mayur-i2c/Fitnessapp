import React, {useState} from 'react';

import {
Button,
TextField,
Link,
Grid,
Box,
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
// import { useUserDispatch, loginUser } from "../../../context/UserContext";
import { useForm } from "react-hook-form"

import { adminLogin } from "../../../ApiServices";
import { useNavigate } from "react-router-dom";


function  AuthLogin ()  {

  let navigate = useNavigate();
   // global
  //  var userDispatch = useUserDispatch();
   
   // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);



const handleClickShowPassword = () => setShowPassword((show) => !show);

const onSubmit = async (data) => {
  setError(false);
  setIsLoading(true);
  adminLogin(data)
  .then((response) => {          
      if (response.data.status === 401 || !response.data.isSuccess) {        
        setError(response.data.message);
        setIsLoading(false);
      } else {                                
          localStorage.setItem("token", response.data.info);          
          setError("");
          setIsLoading(false);
          // dispatch({ type: "LOGIN_SUCCESS" });
          navigate("/dashboard");
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
  <Fade in={error} mb={2}>
    <Typography color="#FF0000"  >
      {error ? error : ""}
    </Typography>
  </Fade>
  <TextField
    id="email"
    {...register("email", { required: true })}
    margin="normal"
    placeholder="Email Id"
    type="email"
    label="Email Id" 
    fullWidth
  />
  <FormControl  sx={{ mt: 2 }} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
    <OutlinedInput fullWidth id="password"
      {...register("password", { required: true })}
      placeholder="Password"
      label="Password"
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
  <Grid item xs={12} mt={2}>
    <Box display="flex" justifyContent="flex-end">
        <Typography
          variant="body2"
          gutterBottom
          component={Link}
          // align="right"
          to="/register"
        > Forget Password?
        </Typography>
    </Box>
  </Grid>
  <div>
  {isLoading ? (
                    <CircularProgress
                      size={26}
                     
                    />
                  ) : (
                    <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth> 
          Login
      </Button>
                  )}

      
  </div>           
</form>
);
}

export default AuthLogin;

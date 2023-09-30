import React, {useState} from 'react';

import {
Button,
TextField,
Typography,
CircularProgress,
Grid,
Link,
Fade,
Stack,

} from  '@mui/material';


import { useForm } from "react-hook-form"

import { checkmailid } from "../../../ApiServices";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function  AuthForgotPass ()  {

   // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState();
  var [success, setSuccess] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = async(data) => {
    setError("");
    setIsLoading(true);
    console.log(data);
    checkmailid(data)
      .then((response) => {
        if (
          response.data.isSuccess === 400 ||
          response.data.isSuccess === false
        ) {
          setError(response.data.message);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setSuccess("Check your mail box.");
          toast.success(response.data.info);
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
  <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="h4">Forgot Password</Typography>
                
        <Typography
          variant="body2"
          gutterBottom
          component={Link}
          href="/"
          justifyContent="flex-end"
        > Back to Login
        </Typography>
                </Stack>
              </Grid>


  <Fade in={error} mt={2}>
    <Typography color="#FF0000"  >
      {error ? error : ""}
    </Typography>
  </Fade>
  <ToastContainer />
  <Fade in={success} mt={2}>
    <Typography color="#40903c" fullWidth >
      {success ? success : ""}
    </Typography>
  </Fade>



  <TextField 
    id="email"
    {...register("email", { required: true })}
    margin="normal"
    placeholder="Email Id"
    type="email"
    label="Email Id" 
    sx={{ width: 350, mb:2 }}
    fullWidth
  />
  
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
          Send Password Reset Email
      </Button>
                  )}

      
  </div>           
</form>
);
}

export default AuthForgotPass;

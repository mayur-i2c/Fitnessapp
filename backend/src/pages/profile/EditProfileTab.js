import PropTypes from 'prop-types';

import React, {useState} from 'react';

import {
Button,
TextField,
Grid,
Typography,
CircularProgress,
IconButton,
Fade
} from  '@mui/material';

import { styled } from '@mui/material/styles';

import Person from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';

// import axios from "axios";
// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { useForm } from "react-hook-form"

// import { adminLogin } from "../../../ApiServices";
import { useNavigate } from "react-router-dom";


const EditProfileTab = () => {
  let navigate = useNavigate();
  // global
  var userDispatch = useUserDispatch();
  
  // local
 var [isLoading, setIsLoading] = useState(false);
 var [error, setError] = useState("");
 const { register, handleSubmit } = useForm();

const onSubmit = async (data) => {
 loginUser(userDispatch, data, navigate, setIsLoading, setError);
};

const Input = styled('input')({
  display: 'none',
});

const [newUrl, setNewUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };


  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

  <Fade in={error} mb={2}>
    <Typography color="#FF0000"  >
      {error ? error : ""}
    </Typography>
  </Fade>

  <Stack direction="row" alignItems="center" spacing={2}>
      
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileUpload} />
          <IconButton color="primary" aria-label="upload picture" component="span" >
            <Person  width="100"/>
          </IconButton>
        </label>

        <img src={newUrl}  alt="Profile" width="100" height={100} />
    </Stack>
    
   
  <TextField
    id="name"
    {...register("name", { required: true })}
    margin="normal"
    placeholder="Name"
    type="name"
    label="Name" 
    readOnly={true}
    fullWidth
  />

  
  <TextField
    id="outlined-read-only-input"
    {...register("email", { required: true })}
    margin="normal"
    placeholder="Email Id"
    type="email"
    label="Email Id" 
    readOnly={true}
    value="admin@gmail.com"
    fullWidth
    
  />
  
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
      style={{'margin-top':'15px','float':'right'}} > 
      Update
      </Button>
    )}
  </div>           
</form>
  );
};

EditProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default EditProfileTab;

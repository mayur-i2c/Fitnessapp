import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';

import { Button, Input, Grid, Typography, CircularProgress, Fade } from '@mui/material';
// import { styled } from '@mui/material/styles';

// import Person from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';

// import axios from "axios";
// context
// import { useUserDispatch, loginUser } from '../../context/UserContext';
import { useForm } from 'react-hook-form';

// import { adminLogin } from "../../../ApiServices";
// import { useNavigate } from 'react-router-dom';
import { adminDetails, UpdateProfile } from '../../ApiServices';
import avatar1 from 'assets/images/users/avatar-1.png';
import upload from 'assets/images/upload3.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomInput from 'components/CustomInput';

const EditProfileTab = () => {
  // let navigate = useNavigate();
  // global
  // var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [defaultLoading, setdefaultLoading] = useState(true);
  // var [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  // const Input = styled('input')({
  //   display: 'none'
  // });

  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const admindata = async () => {
    await adminDetails()
      .then((response) => {
        setValue('name', response.data.info.name);
        setValue('email', response.data.info.email);
        response.data.info.image ? setNewUrl(`${process.env.REACT_APP_API_KEY_IMAGE_PATH}/${response.data.info.image}`) : avatar1;
        setdefaultLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setdefaultLoading(false);
      });
  };
  useEffect(() => {
    admindata();
  }, [setValue, getValues]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onSubmitProfile = (data) => {
    // console.log(getValues());
    setIsLoading(true);
    let formData = new FormData(); //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    UpdateProfile(formData)
      .then((response) => {
        if (response.data.isSuccess && response.data.status === 200) {
          setIsLoading(false);
          // admindata();
          toast.success('Updated successfully!');
        } else {
          if ((response.data.status === 202 || 400) && !response.data.isSuccess) {
            toast.error(response.data.message);
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        if (!err.response.data.isSuccess) {
          if (err.response.data.status === 400) {
            toast.error(err.response.data.message);
            setIsLoading(false);
          } else {
            toast.error('Something is wrong in an input.');
            setIsLoading(false);
          }
        } else {
          toast.error('Something Went Wrong!');
          setIsLoading(false);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitProfile)}>
      {defaultLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Fade mb={2}>
            <Typography color="#FF0000"></Typography>
            {/* {error ? error : ''} */}
          </Fade>
          <ToastContainer />
          <Grid container spacing={3}>
            <Grid xs={8} mt={2} spacing={3}>
              <CustomInput
                xs={12}
                m={2}
                spacing={3}
                id="name"
                name="name"
                label="Name"
                inputRef={register('name', { required: true })}
                error={!!errors.name}
                helperText={errors.name && 'Name is required'} // Display the error message here
                placeholder="Name"
                defaultValue={getValues('name')}
                onChange={(e) => setValue('name', e.target.value)}
              />

              <CustomInput
                xs={12}
                m={2}
                spacing={3}
                id="email"
                name="email"
                label="Email"
                inputRef={register('email', { required: true })}
                error={!!errors.email}
                helperText={errors.email && 'Email is required'} // Display the error message here
                placeholder="Email"
                defaultValue={getValues('email')}
                readOnly={true}
                disabled={true}
                onChange={(e) => setValue('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={4} mt={2} style={{ textAlign: 'center' }}>
              <Stack
                direction="row"
                alignItems="center"
                style={{ display: 'block' }}
                spacing={2}
                sx={6}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <label htmlFor="icon-button-file" style={{ textAlign: 'center' }}>
                  <Input
                    name="image"
                    accept="image/*"
                    {...register('image')}
                    id="icon-button-file"
                    type="file"
                    onChange={handleFileUpload}
                    alignItems="center"
                    style={{ top: '-9999px', left: '-9999px' }}
                  />
                  {!isHovering ? (
                    <img src={newUrl} alt="Profile" width="100" height={100} style={{ borderRadius: '50%' }} />
                  ) : (
                    <img src={upload} alt="Profile" width="100" height={100} style={{ borderRadius: '50%' }} />
                  )}
                </label>
              </Stack>
            </Grid>
          </Grid>

          <div>
            {isLoading ? (
              <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                <CircularProgress size={26} fullWidth style={{ 'margin-top': '15px', float: 'right' }} />
              </Grid>
            ) : (
              <Button type="submit" variant="contained" color="primary" size="large" style={{ 'margin-top': '15px', float: 'right' }}>
                Update
              </Button>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

EditProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default EditProfileTab;

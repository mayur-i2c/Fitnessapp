import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography, CircularProgress, Input, FormHelperText, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import MainCard from 'components/MainCard';
import { useForm, Controller } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { addWorkCollection, updateWorkCollection } from '../../ApiServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'assets/images/upload3.jpg';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';

const WorkoutCollectionForm = () => {
  const { state } = useLocation();

  var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  const [isupdate, setisupdate] = useState('');
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState(upload);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  useEffect(() => {
    if (state) {
      const { editdata, imageurl } = state;
      setisupdate(editdata._id);
      setValue('title', editdata.title);
      setValue('description', editdata.description);
      setNewUrl(imageurl + editdata.image);
    }
    setdefaultLoading(false);
  }, []);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const onSubmit = (data) => {
    setIsLoading(false);
    let formData = new FormData(); //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    isupdate === ''
      ? addWorkCollection(formData)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Added successfully!');
            navigate('/workoutCollection');
          })
          .catch((err) => {
            if (!err.response.data.isSuccess) {
              toast.error(capitalizeFirstLetter(err.response.data.message));
            } else {
              toast.error('Something Went Wrong!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
            }
            setIsLoading(false);
          })
      : updateWorkCollection(formData, isupdate)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Updated successfully!');
            navigate('/workoutCollection');
          })
          .catch((err) => {
            if (!err.response.data.isSuccess) {
              toast.error(capitalizeFirstLetter(err.response.data.message));
            } else {
              toast.error('Something Went Wrong!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
            }
            setIsLoading(false);
          });
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{isupdate === '' ? 'Add' : 'Update'} Workout Collection</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid xs={12} sx={{ p: 3 }}>
              <ToastContainer />
              <form onSubmit={handleSubmit(onSubmit)}>
                {defaultLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    <Grid xs={12} mt={2} spacing={3} container>
                      <CustomInput
                        xs={8}
                        m={2}
                        spacing={3}
                        id="title"
                        name="title"
                        label="Title"
                        inputRef={register('title', { required: true })}
                        error={!!errors.title}
                        helperText={errors.title && 'Title is required'} // Display the error message here
                        placeholder="Title"
                        defaultValue={getValues('title')}
                        onChange={(e) => setValue('title', e.target.value)}
                      />

                      <Grid item xs={3} style={{ textAlign: 'center' }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          style={{ display: 'grid' }}
                          spacing={2}
                          sx={6}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          <label htmlFor="icon-button-file" style={{ textAlign: 'center', marginTop: '-40px' }}>
                            <Input
                              name="image"
                              accept="image/*"
                              {...register('image', { required: isupdate ? false : true })}
                              id="icon-button-file"
                              type="file"
                              onChange={handleFileUpload}
                              alignItems="center"
                              style={{ top: '-9999px', left: '-9999px' }}
                            />
                            {!isHovering ? (
                              <img src={newUrl} alt="WorkoutCollection" width="100" height={100} style={{ borderRadius: '50%' }} />
                            ) : (
                              <img src={upload} alt="WorkoutCollection" width="100" height={100} style={{ borderRadius: '50%' }} />
                            )}
                          </label>
                          {/* <br /> */}
                          <span>Image</span>
                          <FormHelperText error style={{ textAlign: 'center' }}>
                            {errors.image && 'Image is required'}
                          </FormHelperText>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={3} style={{ display: 'contents' }}>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue={getValues('description')}
                        render={({ field }) => (
                          <Paper variant="outlined" style={{ margin: '15px', padding: '8px' }}>
                            <Typography variant="body1" gutterBottom>
                              Description
                            </Typography>
                            <ReactQuill value={field.value || ''} onChange={field.onChange} style={{ height: '200px', border: 'none' }} />
                          </Paper>
                        )}
                      />
                    </Grid>

                    {isLoading ? (
                      <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                        <CircularProgress size={26} fullWidth style={{ 'margin-top': '25px' }} />
                      </Grid>
                    ) : (
                      <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ 'margin-top': '25px', textAlign: 'center' }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    )}
                  </div>
                )}
              </form>
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default WorkoutCollectionForm;

import { useLocation } from 'react-router-dom';
import {
  Button,
  TextField,
  Input,
  Grid,
  Typography,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from 'react-hook-form';
import upload from 'assets/images/upload3.jpg';
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { getActiveMedicalCon, updateUserProfile, addUser } from '../../ApiServices';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import no_profile from 'assets/images/users/no_profile.jpeg';

const UserForm = () => {
  // Access the location object, which contains the state data
  const { state } = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm();

  var [defaultLoading, setdefaultLoading] = useState(true);
  // local
  var [isLoading, setIsLoading] = useState(false);
  const [MedicalCon, setMedicalCon] = useState([]);
  const [isupdate, setisupdate] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getActiveMedicalCon().then((response) => {
      setMedicalCon(response.data.info);
    });
    setIsLoading(false);
    if (state) {
      setValue('pass1', '123456');
      // Access the state data (editdata and imageurl)
      const { editdata, imageurl } = state;

      setisupdate(editdata._id);
      setValue('name', editdata.name);
      setValue('email', editdata.email);
      setValue('mo_no', editdata.mo_no);
      const dob = new Date(editdata.dob);
      setSelectedDate(dob);
      setValue('dob', dob);
      setValue('age', editdata.age);
      setValue('sex', editdata.sex);
      setValue('active_status', editdata.active_status);
      setValue('height', editdata.height);
      setValue('height_measure', editdata.height_measure);
      setValue('c_weight', editdata.c_weight);
      setValue('t_weight', editdata.t_weight);
      setValue('medical_condition', editdata.medical_condition);
      editdata.image ? setNewUrl(imageurl + editdata.image) : setNewUrl(no_profile);
      setdefaultLoading(false);
    } else {
      setNewUrl(no_profile);
      setdefaultLoading(false);
    }
  }, [state]);

  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleDateChange = (date) => {
    // const dateOfBirth = new Date(date);
    // const dob = dateOfBirth.getTime();

    setValue('dob', date);
    setSelectedDate(date);
  };

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
    console.log(data);
    setIsLoading(false);
    let formData = new FormData(); //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else if (Array.isArray(data[key])) {
        // Check if the field value is an array (multiple select)
        data[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    isupdate === ''
      ? addUser(formData)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Added successfully!');
            navigate('/users');
          })
          .catch(() => {
            if (!err.response.data.isSuccess) {
              // Iterate through the error object to extract keys and values
              Object.keys(err.response.data.message).forEach((key) => {
                // Set the error message for each field
                setError(key, {
                  type: 'manual',
                  message: err.response.data.message[key]
                });
              });
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
      : updateUserProfile(formData, isupdate)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Updated successfully!');
            navigate('/users');
          })
          .catch((err) => {
            if (!err.response.data.isSuccess) {
              // Iterate through the error object to extract keys and values
              Object.keys(err.response.data.message).forEach((key) => {
                // Set the error message for each field
                setError(key, {
                  type: 'manual',
                  message: err.response.data.message[key]
                });
              });

              // toast.error(err.response.data.message);
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
    <Grid item xs={12} md={6} lg={6}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Update User</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Stack spacing={3}>
          <Grid xs={12} sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Grid container xs={9}>
                      <Grid xs={4} mt={2} spacing={3}>
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
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3}>
                        <CustomInput
                          xs={12}
                          m={2}
                          spacing={3}
                          id="email"
                          name="email"
                          label="Email"
                          inputRef={register('email', { required: 'Email Id is required' })}
                          error={!!errors.email}
                          helperText={errors.email && errors.email.message} // Display the error message here
                          placeholder="Email"
                          defaultValue={getValues('email')}
                          onChange={(e) => setValue('email', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={4} mt={2} spacing={3}>
                        <CustomInput
                          xs={12}
                          m={2}
                          spacing={3}
                          id="mo_no"
                          name="Mobile No"
                          label="Mobile No"
                          inputRef={register('mo_no', {
                            required: 'Mobile number is required',
                            pattern: {
                              value: /^\d{10}$/,
                              message: 'Invalid Mobile number.'
                            },
                            minLength: {
                              value: 10,
                              message: 'Mobile number must have at least 10 digit'
                            },
                            maxLength: {
                              value: 10,
                              message: 'Mobile number max values 10 digit'
                            } // Use the custom validation rule
                          })}
                          error={!!errors.mo_no}
                          helperText={errors.mo_no && errors.mo_no.message} // Display the error message here
                          placeholder="Mobile No"
                          defaultValue={getValues('mo_no')}
                          onChange={(e) => setValue('mo_no', e.target.value)}
                        />
                      </Grid>

                      <Grid spacing={3} mt={2} xs={4}>
                        {/* <DatePicker
                          fullWidth
                          selected={selectedDate}
                          onChange={handleDateChange}
                          yearDropdownItemNumber={10}
                          showYearDropdown
                          dateFormat="dd/MM/yyyy" // Set the date format here
                          customInput={
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="dob"
                              label="Date of Birth"
                              InputLabelProps={{ shrink: true }}
                              style={{ marginTop: '16px', marginBottom: '16px' }}
                            />
                          }
                        /> */}
                        <Controller
                          name="dob" // Specify the field name
                          control={control}
                          // error={!!errors.dob}
                          // rules={{ required: 'Date Of Birth is required' }}
                          defaultValue={getValues('dob')} // Provide the default value as null
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              yearDropdownItemNumber={10}
                              showYearDropdown
                              dateFormat="dd/MM/yyyy" // Set the date format here
                              customInput={
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="dob"
                                  label="Date of Birth"
                                  InputLabelProps={{ shrink: true }}
                                  style={{ marginTop: '16px', marginBottom: '16px' }}
                                />
                              }
                              selected={selectedDate}
                              onChange={handleDateChange}
                            />
                          )}
                        />
                        {errors.dob && <p>{errors.dob.message}</p>}
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3}>
                        <CustomInput
                          xs={12}
                          m={2}
                          spacing={3}
                          id="age"
                          name="Age"
                          label="Age"
                          inputRef={register('age', { required: true })}
                          error={!!errors.age}
                          helperText={errors.age && 'Age is required'} // Display the error message here
                          placeholder="Age"
                          defaultValue={getValues('age')}
                          onChange={(e) => setValue('age', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'flex' }}>
                        <FormControl fullWidth style={{ margin: '16px' }} error={!!errors.sex}>
                          <InputLabel id="select-label" shrink={true} style={{ marginTop: '16px' }}>
                            Gender
                          </InputLabel>
                          <Controller
                            name="sex" // Specify the field name
                            control={control}
                            defaultValue={getValues('sex')} // Provide the default value
                            error={!!errors.sex}
                            rules={{ required: 'Gender is required' }}
                            render={({ field }) => (
                              <Select {...field} labelId="sex" id="sex" style={{ marginTop: '16px' }}>
                                <MenuItem value="1">Male</MenuItem>
                                <MenuItem value="2">Female</MenuItem>
                                <MenuItem value="3">Others</MenuItem>
                              </Select>
                            )}
                          />
                          <FormHelperText error>{errors.sex && errors.sex.message}</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'Flex' }}>
                        <CustomInput
                          xs={12}
                          m={2}
                          spacing={3}
                          id="height"
                          name="Height"
                          label="Height"
                          inputRef={register('height', { required: true })}
                          error={!!errors.height}
                          helperText={errors.height && 'Height is required'}
                          placeholder="Height"
                          defaultValue={getValues('height')}
                          onChange={(e) => setValue('height', e.target.value)}
                        />
                        <FormControl fullWidth style={{ margin: '16px' }} error={!!errors.height_measure}>
                          <InputLabel id="height_measure" shrink={true} style={{ marginTop: '16px' }}>
                            Height Measure
                          </InputLabel>
                          <Controller
                            name="height_measure" // Specify the field name
                            control={control}
                            defaultValue={getValues('height_measure')} // Provide the default value
                            error={!!errors.height_measure}
                            rules={{ required: 'Height Measure is required' }}
                            render={({ field }) => (
                              <Select {...field} labelId="height_measure" id="height_measure" style={{ marginTop: '16px' }}>
                                <MenuItem value={1}>Ft/In</MenuItem>
                                <MenuItem value={2}>Cm</MenuItem>
                              </Select>
                            )}
                          />
                          <FormHelperText error>{errors.height_measure && errors.height_measure.message}</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3}>
                        <CustomInput
                          xs={12}
                          m={2}
                          spacing={3}
                          id="c_weight"
                          name="Current Weight"
                          label="Current Weight"
                          inputRef={register('c_weight', { required: true })}
                          error={!!errors.c_weight}
                          helperText={errors.c_weight && 'Current Weight is required'}
                          placeholder="Current Weight"
                          defaultValue={getValues('c_weight')}
                          onChange={(e) => setValue('c_weight', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3}>
                        <CustomInput
                          xs={12}
                          m={2}
                          spacing={3}
                          id="t_weight"
                          name="Target Weight"
                          label="Target Weight"
                          inputRef={register('t_weight', { required: true })}
                          error={!!errors.t_weight}
                          helperText={errors.t_weight && 'Target Weight is required'}
                          placeholder="Target Weight"
                          defaultValue={getValues('t_weight')}
                          onChange={(e) => setValue('t_weight', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'flex' }}>
                        <FormControl fullWidth style={{ margin: '16px' }} error={!!errors.active_status}>
                          <InputLabel id="select-label" shrink={true} style={{ marginTop: '16px' }}>
                            How Active Are You?
                          </InputLabel>
                          <Controller
                            name="active_status" // Specify the field name
                            control={control}
                            defaultValue={getValues('active_status')} // Provide the default value
                            error={!!errors.active_status}
                            rules={{ required: 'Height Measure is required' }}
                            render={({ field }) => (
                              <Select {...field} labelId="active_status" id="active_status" style={{ marginTop: '16px' }}>
                                <MenuItem value="1">Little or no activity</MenuItem>
                                <MenuItem value="2">Little Activity</MenuItem>
                                <MenuItem value="3">Moderately Active</MenuItem>
                                <MenuItem value="4">Very Active</MenuItem>
                              </Select>
                            )}
                          />
                          <FormHelperText error>{errors.active_status && errors.active_status.message}</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'flex' }}>
                        <FormControl fullWidth style={{ margin: '16px' }} error={!!errors.medical_condition}>
                          <InputLabel id="select-label" shrink={true} style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Medical Conditions
                          </InputLabel>
                          <Controller
                            name="medical_condition" // Specify the field name
                            control={control}
                            defaultValue={isupdate === '' ? [] : getValues('medical_condition')}
                            error={!!errors.medical_condition}
                            rules={{ required: 'Medical Conditions is required' }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                labelId="medical_condition"
                                id="medical_condition"
                                style={{ marginTop: '16px', marginBottom: '16px' }}
                                multiple
                              >
                                {MedicalCon.map((cat) => {
                                  return (
                                    <MenuItem key={cat._id} value={cat._id}>
                                      {cat.title}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}
                          />
                          <FormHelperText error>{errors.medical_condition && errors.medical_condition.message}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid xs={3} mt={2} spacing={3}>
                      <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
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
                  </Grid>

                  <div>
                    {isLoading ? (
                      <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                        <CircularProgress size={26} fullWidth style={{ 'margin-top': '15px', float: 'right' }} />
                      </Grid>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ 'margin-top': '15px', float: 'right' }}
                      >
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </Grid>
        </Stack>
      </MainCard>
    </Grid>
  );
};

export default UserForm;

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
  MenuItem
} from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from 'react-hook-form';
import upload from 'assets/images/upload3.jpg';
import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { getActiveMedicalCon } from '../../ApiServices';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

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
    formState: { errors }
  } = useForm();
  // Access the state data (editdata and imageurl)
  const { editdata, imageurl } = state;
  var [defaultLoading, setdefaultLoading] = useState(true);
  // local
  var [isLoading, setIsLoading] = useState(false);
  const [MedicalCon, setMedicalCon] = useState([]);

  useEffect(() => {
    getActiveMedicalCon().then((response) => {
      setMedicalCon(response.data.info);
    });
    setIsLoading(false);
    if (editdata) {
      setValue('name', editdata.name);
      setValue('email', editdata.email);
      setValue('mo_no', editdata.mo_no);
      // const dob = new Date(editdata.dob);
      setSelectedDate(editdata.dob);
      setValue('dob', editdata.dob);
      setValue('age', editdata.age);
      setValue('sex', editdata.sex);
      setValue('active_status', editdata.active_status);
      setValue('height', editdata.height);
      setValue('height_measure', editdata.height_measure);
      setValue('c_weight', editdata.c_weight);
      setValue('t_weight', editdata.t_weight);
      setValue('medical_condition', editdata.medical_condition);
      editdata.image ? setNewUrl(imageurl + editdata.image) : '';
      setdefaultLoading(false);
    }
  }, [state]);

  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleDateChange = (date) => {
    const dateOfBirth = new Date(date);
    const dob = dateOfBirth.getTime();

    setValue('dob', dob);
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
                          inputRef={register('email', { required: true })}
                          error={!!errors.email}
                          helperText={errors.email && 'Email is required'} // Display the error message here
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
                          inputRef={register('mo_no', { required: true })}
                          error={!!errors.name}
                          helperText={errors.name && 'Mobile No is required'} // Display the error message here
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
                          placeholder="Age"
                          defaultValue={getValues('age')}
                          onChange={(e) => setValue('age', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'flex' }}>
                        <FormControl fullWidth required style={{ margin: '16px' }}>
                          <InputLabel id="select-label" shrink={true} style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Sex
                          </InputLabel>
                          <Controller
                            name="sex" // Specify the field name
                            control={control}
                            defaultValue={getValues('sex')} // Provide the default value
                            render={({ field }) => (
                              <Select {...field} labelId="sex" id="sex" style={{ marginTop: '16px', marginBottom: '16px' }}>
                                <MenuItem value="1">Male</MenuItem>
                                <MenuItem value="2">Female</MenuItem>
                                <MenuItem value="3">Others</MenuItem>
                              </Select>
                            )}
                          />
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
                          placeholder="Height"
                          defaultValue={getValues('height')}
                          onChange={(e) => setValue('height', e.target.value)}
                        />
                        <FormControl fullWidth required style={{ margin: '16px' }}>
                          <InputLabel id="height_measure" shrink={true} style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Height Measure
                          </InputLabel>
                          <Controller
                            name="height_measure" // Specify the field name
                            control={control}
                            defaultValue={getValues('height_measure')} // Provide the default value
                            render={({ field }) => (
                              <Select
                                {...field}
                                labelId="height_measure"
                                id="height_measure"
                                style={{ marginTop: '16px', marginBottom: '16px' }}
                              >
                                <MenuItem value={1}>Ft/In</MenuItem>
                                <MenuItem value={2}>Cm</MenuItem>
                              </Select>
                            )}
                          />
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
                          placeholder="Target Weight"
                          defaultValue={getValues('t_weight')}
                          onChange={(e) => setValue('t_weight', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'flex' }}>
                        <FormControl fullWidth required style={{ margin: '16px' }}>
                          <InputLabel id="select-label" shrink={true} style={{ marginTop: '16px', marginBottom: '16px' }}>
                            How Active Are You?
                          </InputLabel>
                          <Controller
                            name="active_status" // Specify the field name
                            control={control}
                            defaultValue={getValues('active_status')} // Provide the default value
                            render={({ field }) => (
                              <Select
                                {...field}
                                labelId="active_status"
                                id="active_status"
                                style={{ marginTop: '16px', marginBottom: '16px' }}
                              >
                                <MenuItem value="1">Little or no activity</MenuItem>
                                <MenuItem value="2">Little Activity</MenuItem>
                                <MenuItem value="3">Moderately Active</MenuItem>
                                <MenuItem value="4">Very Active</MenuItem>
                              </Select>
                            )}
                          />
                        </FormControl>
                      </Grid>

                      <Grid xs={4} mt={2} spacing={3} style={{ display: 'flex' }}>
                        <FormControl fullWidth required style={{ margin: '16px' }}>
                          <InputLabel id="select-label" shrink={true} style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Medical Conditions
                          </InputLabel>
                          <Controller
                            name="medical_condition" // Specify the field name
                            control={control}
                            defaultValue={getValues('medical_condition')}
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

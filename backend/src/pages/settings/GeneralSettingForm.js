import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress, Fade } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { getGeneralSettings, updateGeneralSetting } from '../../ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'components/MainCard';
import { useUserState } from '../../context/UserContext';
import CustomInput from 'components/CustomInput';

const GeneralSettingForm = () => {
  var [isLoading, setIsLoading] = useState(false);
  var [defaultLoading, setdefaultLoading] = useState(true);
  var [tcid, settcid] = useState(true);
  const { userRole } = useUserState();
  const {
    register,
    getValues,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const admindata = async () => {
    await getGeneralSettings()
      .then((response) => {
        setValue('fcm_token', response.data.info[0].fcm_token);
        setValue('email', response.data.info[0].email);
        setValue('password', response.data.info[0].password);
        settcid(response.data.info[0]._id);
        setdefaultLoading(false);
      })
      .catch(() => {
        setdefaultLoading(false);
      });
  };
  useEffect(() => {
    admindata();
  }, [setValue, getValues]);

  const onSubmit = (data) => {
    if (userRole == 1) {
      // console.log(getValues());
      setIsLoading(true);
      updateGeneralSetting(data, tcid)
        .then((response) => {
          console.log(response.data);
          if (response.data.isSuccess && response.data.status === 200) {
            setIsLoading(false);
            toast.success('Updated successfully!');
          } else {
            if ((response.data.status === 202 || 400) && !response.data.isSuccess) {
              Object.keys(response.data.message).forEach((key) => {
                // Set the error message for each field
                setError(key, {
                  type: 'manual',
                  message: response.data.message[key]
                });
              });
              setIsLoading(false);
            }
          }
        })
        .catch((err) => {
          if ((err.response.data.status === 401 || 400) && !err.response.data.isSuccess)
            Object.keys(err.response.data.message).forEach((key) => {
              // Set the error message for each field
              setError(key, {
                type: 'manual',
                message: err.response.data.message[key]
              });
            });
          setIsLoading(false);
        });
    } else {
      toast.error('Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.');
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">General Settings</Typography>
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
                    <Fade mb={2}>
                      <Typography color="#FF0000"></Typography>
                    </Fade>
                    <ToastContainer />
                    <Grid xs={12}>
                      <CustomInput
                        xs={12}
                        id="fcm_token"
                        name="fcm_token"
                        label="FCM Token"
                        inputRef={register('fcm_token', { required: true })}
                        error={!!errors.fcm_token}
                        helperText={errors.fcm_token && 'FCM Token is required'} // Display the error message here
                        placeholder="FCM Token"
                        defaultValue={getValues('fcm_token')}
                        onChange={(e) => setValue('fcm_token', e.target.value)}
                      />
                    </Grid>
                    {/* <Grid xs={12}>
                      <CustomInput
                        xs={12}
                        id="email"
                        type="email"
                        name="email"
                        label="Email Id"
                        inputRef={register('email', { required: true })}
                        error={!!errors.email}
                        helperText={errors.email && 'Email Id is required'} // Display the error message here
                        placeholder="Email Id"
                        defaultValue={getValues('email')}
                        onChange={(e) => setValue('email', e.target.value)}
                      />
                    </Grid>

                    <Grid xs={12}>
                      <CustomInput
                        xs={12}
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        inputRef={register('password', { required: true })}
                        error={!!errors.password}
                        helperText={errors.password && 'Password is required'} // Display the error message here
                        placeholder="Password"
                        defaultValue={getValues('password')}
                        onChange={(e) => setValue('password', e.target.value)}
                      />
                    </Grid> */}
                    <div>
                      {isLoading ? (
                        <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                          <CircularProgress size={26} fullWidth style={{ 'margin-top': '40px', float: 'right' }} />
                        </Grid>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ 'margin-top': '40px', float: 'right' }}
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
    </Grid>
  );
};

export default GeneralSettingForm;

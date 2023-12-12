import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress, Fade } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { getMeal, updateMealSettings } from '../../ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'components/MainCard';
import { useUserState } from '../../context/UserContext';
import CustomInput from 'components/CustomInput';

const MealSettingForm = () => {
  var [isLoading, setIsLoading] = useState(false);
  var [defaultLoading, setdefaultLoading] = useState(true);
  var [tcid, settcid] = useState(true);
  const { userRole } = useUserState();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const nutritiondata = async () => {
    await getMeal()
      .then((response) => {
        setValue('breakfast', response.data.info[0].breakfast);
        setValue('morning_snack', response.data.info[0].morning_snack);
        setValue('lunch', response.data.info[0].lunch);
        setValue('evening_snack', response.data.info[0].evening_snack);
        setValue('dinner', response.data.info[0].dinner);
        settcid(response.data.info[0]._id);
        setdefaultLoading(false);
      })
      .catch(() => {
        setdefaultLoading(false);
      });
  };
  useEffect(() => {
    nutritiondata();
  }, [setValue, getValues]);

  const onSubmit = (data) => {
    if (userRole == 1) {
      // console.log(getValues());
      setIsLoading(true);
      updateMealSettings(data, tcid)
        .then((response) => {
          if (response.data.isSuccess && response.data.status === 200) {
            setIsLoading(false);
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
    } else {
      toast.error('Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.');
    }
  };

  return (
    <Grid container xs={5}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Meal Settings</Typography>
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
                    <Grid container xs={12}>
                      <Grid xs={10}>
                        <CustomInput
                          xs={12}
                          id="breakfast"
                          name="breakfast"
                          label="Breakfast"
                          inputRef={register('breakfast', { required: true })}
                          error={!!errors.breakfast}
                          helperText={errors.breakfast && 'Breakfast is required'} // Display the error message here
                          placeholder="Breakfast"
                          defaultValue={getValues('breakfast')}
                          onChange={(e) => setValue('breakfast', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={2}>
                        <CustomInput xs={12} placeholder="%" defaultValue="%" disabled={true} />
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>
                      <Grid xs={10} mt={2}>
                        <CustomInput
                          xs={12}
                          id="morning_snack"
                          name="morning_snack"
                          label="Morning snack"
                          inputRef={register('morning_snack', { required: true })}
                          error={!!errors.morning_snack}
                          helperText={errors.morning_snack && 'Morning snack is required'} // Display the error message here
                          placeholder="Morning snack"
                          defaultValue={getValues('morning_snack')}
                          onChange={(e) => setValue('morning_snack', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={2} mt={2}>
                        <CustomInput xs={12} placeholder="%" defaultValue="%" disabled={true} />
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>
                      <Grid xs={10} mt={2}>
                        <CustomInput
                          xs={12}
                          id="lunch"
                          name="lunch"
                          label="Lunch"
                          inputRef={register('lunch', { required: true })}
                          error={!!errors.lunch}
                          helperText={errors.lunch && 'Lunch is required'} // Display the error message here
                          placeholder="Lunch"
                          defaultValue={getValues('lunch')}
                          onChange={(e) => setValue('lunch', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={2} mt={2}>
                        <CustomInput xs={12} placeholder="%" defaultValue="%" disabled={true} />
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>
                      <Grid xs={10} mt={2}>
                        <CustomInput
                          xs={12}
                          id="evening_snack"
                          name="evening_snack"
                          label="Evening snack"
                          inputRef={register('evening_snack', { required: true })}
                          error={!!errors.evening_snack}
                          helperText={errors.evening_snack && 'Evening snack is required'} // Display the error message here
                          placeholder="Evening snack"
                          defaultValue={getValues('evening_snack')}
                          onChange={(e) => setValue('evening_snack', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={2} mt={2}>
                        <CustomInput xs={12} placeholder="%" defaultValue="%" disabled={true} />
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>
                      <Grid xs={10} mt={2}>
                        <CustomInput
                          xs={12}
                          id="dinner"
                          name="dinner"
                          label="Dinner"
                          inputRef={register('dinner', { required: true })}
                          error={!!errors.dinner}
                          helperText={errors.dinner && 'Dinner is required'} // Display the error message here
                          placeholder="Dinner"
                          defaultValue={getValues('dinner')}
                          onChange={(e) => setValue('dinner', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={2} mt={2}>
                        <CustomInput xs={12} placeholder="%" defaultValue="%" disabled={true} />
                      </Grid>
                    </Grid>
                    <div style={{ textAlign: 'center' }}>
                      {isLoading ? (
                        <Grid item xs={12} mt={2}>
                          <CircularProgress size={26} fullWidth style={{ 'margin-top': '40px' }} />
                        </Grid>
                      ) : (
                        <Button type="submit" variant="contained" color="primary" size="large" style={{ 'margin-top': '40px' }}>
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

export default MealSettingForm;

import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress, Fade } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { getNutrition, updateNutritionSettings } from '../../ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'components/MainCard';
import { useUserState } from '../../context/UserContext';
import CustomInput from 'components/CustomInput';

const NutritionSettingForm = () => {
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
    await getNutrition()
      .then((response) => {
        setValue('protein', response.data.info[0].protein);
        setValue('carb', response.data.info[0].carb);
        setValue('fat', response.data.info[0].fat);
        setValue('fibre', response.data.info[0].fibre);
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
      updateNutritionSettings(data, tcid)
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
            <Typography variant="h5">Nutrition Settings</Typography>
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
                          id="protein"
                          name="protein"
                          label="Protein"
                          inputRef={register('protein', { required: true })}
                          error={!!errors.protein}
                          helperText={errors.protein && 'Protein is required'} // Display the error message here
                          placeholder="Protein"
                          defaultValue={getValues('protein')}
                          onChange={(e) => setValue('protein', e.target.value)}
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
                          id="carb"
                          name="carb"
                          label="Carb"
                          inputRef={register('carb', { required: true })}
                          error={!!errors.carb}
                          helperText={errors.carb && 'Carb is required'} // Display the error message here
                          placeholder="Carb"
                          defaultValue={getValues('carb')}
                          onChange={(e) => setValue('carb', e.target.value)}
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
                          id="fat"
                          name="fat"
                          label="Fat"
                          inputRef={register('fat', { required: true })}
                          error={!!errors.fat}
                          helperText={errors.fat && 'Fat is required'} // Display the error message here
                          placeholder="Fat"
                          defaultValue={getValues('fat')}
                          onChange={(e) => setValue('fat', e.target.value)}
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
                          id="fibre"
                          name="fibre"
                          label="Fibre"
                          inputRef={register('fibre', { required: true })}
                          error={!!errors.fibre}
                          helperText={errors.fibre && 'Fibre is required'} // Display the error message here
                          placeholder="Fibre"
                          defaultValue={getValues('fibre')}
                          onChange={(e) => setValue('fibre', e.target.value)}
                        />
                      </Grid>
                      <Grid xs={2} mt={2}>
                        <CustomInput xs={12} placeholder="%" defaultValue="g" disabled={true} />
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

export default NutritionSettingForm;

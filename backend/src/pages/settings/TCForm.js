import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress, Fade, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { gettc, updatetc } from '../../ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'components/MainCard';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { useUserState } from '../../context/UserContext';

const TCForm = () => {
  var [isLoading, setIsLoading] = useState(false);
  var [defaultLoading, setdefaultLoading] = useState(true);
  var [tcid, settcid] = useState(true);
  const { userRole } = useUserState();
  const {
    handleSubmit,
    setValue,
    getValues,
    control
    // formState: { errors }
  } = useForm();

  const admindata = async () => {
    await gettc()
      .then((response) => {
        setValue('description', response.data.info[0].description);
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
      updatetc(data, tcid)
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
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Terms & Conditions</Typography>
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

                    <Grid item xs={12} md={3} style={{ display: 'contents' }}>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue={getValues('description')}
                        render={({ field }) => (
                          <Paper variant="outlined" style={{ margin: '15px', padding: '8px' }}>
                            <ReactQuill value={field.value || ''} onChange={field.onChange} style={{ height: '400px', border: 'none' }} />
                          </Paper>
                        )}
                      />
                    </Grid>

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

export default TCForm;

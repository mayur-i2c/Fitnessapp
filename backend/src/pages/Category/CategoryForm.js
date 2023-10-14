import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography, CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { addCategory, updateCategory } from '../../ApiServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryForm = () => {
  const { state } = useLocation();

  var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  const [isupdate, setisupdate] = useState('');
  const navigate = useNavigate();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();
  useEffect(() => {
    if (state) {
      const { editdata } = state;
      setisupdate(editdata._id);
      setValue('title', editdata.title);
    }
    setdefaultLoading(false);
  });

  const onSubmit = (data) => {
    setIsLoading(false);
    isupdate === ''
      ? addCategory(data)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Added successfully!');
            navigate('/category');
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
      : updateCategory(data, isupdate)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Updated successfully!');
            navigate('/category');
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
            <Typography variant="h5">{isupdate === '' ? 'Add' : 'Update'} Category</Typography>
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
                    <CustomInput
                      xs={12}
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

                    {isLoading ? (
                      <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                        <CircularProgress size={26} fullWidth style={{ 'margin-top': '15px' }} />
                      </Grid>
                    ) : (
                      <Grid item xs={12} mt={2} style={{ textAlign: 'center' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ 'margin-top': '15px', textAlign: 'center' }}
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
export default CategoryForm;

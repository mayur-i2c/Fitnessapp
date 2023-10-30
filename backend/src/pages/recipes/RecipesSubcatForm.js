import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography, CircularProgress, Input, FormHelperText } from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import MainCard from 'components/MainCard';
import { useForm, Controller } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { addRecipes, updateRecipes } from '../../ApiServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'assets/images/upload3.jpg';

const RecipesSubcatForm = () => {
  const { state } = useLocation();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  var [defaultLoading, setdefaultLoading] = useState(true);
  const [inputs, setInputs] = useState([{ field1: '', field2: '', field3: '' }]);

  const handleInputChange = (index, fieldName, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][fieldName] = value;
    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { field1: '', field2: '', field3: '' }]);
  };

  const handleRemoveInput = (index) => {
    console.log(inputs);
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
    console.log(inputs);
  };

  var [isLoading, setIsLoading] = useState(false);
  const [isupdate, setisupdate] = useState('');
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState(upload);

  useEffect(() => {
    if (state) {
      const { editdata, imageurl } = state;
      setisupdate(editdata._id);
      setValue('name', editdata.name);
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
    console.log(data);
    // setIsLoading(false);
    // let formData = new FormData(); //formdata object
    // Object.keys(data).forEach(function (key) {
    //   if (key === 'image') {
    //     formData.append(key, data[key][0]);
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // });

    // isupdate === ''
    //   ? addRecipes(formData)
    //       .then(() => {
    //         localStorage.setItem('redirectSuccess', 'true');
    //         localStorage.setItem('redirectMessage', 'Added successfully!');
    //         navigate('/recipes');
    //       })
    //       .catch((err) => {
    //         if (!err.response.data.isSuccess) {
    //           toast.error(capitalizeFirstLetter(err.response.data.message));
    //         } else {
    //           toast.error('Something Went Wrong!', {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined
    //           });
    //         }
    //         setIsLoading(false);
    //       })
    //   : updateRecipes(formData, isupdate)
    //       .then(() => {
    //         localStorage.setItem('redirectSuccess', 'true');
    //         localStorage.setItem('redirectMessage', 'Updated successfully!');
    //         navigate('/recipes');
    //       })
    //       .catch((err) => {
    //         if (!err.response.data.isSuccess) {
    //           toast.error(capitalizeFirstLetter(err.response.data.message));
    //         } else {
    //           toast.error('Something Went Wrong!', {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined
    //           });
    //         }
    //         setIsLoading(false);
    //       });
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{isupdate === '' ? 'Add' : 'Update'} Recipe</Typography>
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
                              {...register('image', { required: isupdate ? false : true })}
                              id="icon-button-file"
                              type="file"
                              onChange={handleFileUpload}
                              alignItems="center"
                              style={{ top: '-9999px', left: '-9999px' }}
                            />
                            {!isHovering ? (
                              <img src={newUrl} alt="recipes" width="100" height={100} style={{ borderRadius: '50%' }} />
                            ) : (
                              <img src={upload} alt="recipes" width="100" height={100} style={{ borderRadius: '50%' }} />
                            )}
                          </label>
                          <FormHelperText error>{errors.image && 'Image is required'}</FormHelperText>
                        </Stack>
                      </Grid>
                    </Grid>

                    {inputs.map((input, index) => (
                      <div key={index}>
                        <Controller
                          name={`inputs[${index}].field1`}
                          control={control}
                          defaultValue={input.field1}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Field 1"
                              //   onChange={(e) => handleInputChange(index, 'field1', e.target.value)}
                            />
                          )}
                        />
                        <Controller
                          name={`inputs[${index}].field2`}
                          control={control}
                          defaultValue={input.field2}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Field 2"
                              //   onChange={(e) => handleInputChange(index, 'field2', e.target.value)}
                            />
                          )}
                        />
                        <Controller
                          name={`inputs[${index}].field3`}
                          control={control}
                          defaultValue={input.field3}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Field 3"
                              //   onChange={(e) => handleInputChange(index, 'field3', e.target.value)}
                            />
                          )}
                        />
                        <button type="button" onClick={() => handleRemoveInput(index)}>
                          Remove
                        </button>
                      </div>
                    ))}

                    <button type="button" onClick={handleAddInput}>
                      Add Input
                    </button>

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
export default RecipesSubcatForm;

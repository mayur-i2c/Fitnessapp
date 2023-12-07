import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography, CircularProgress, Input, FormHelperText, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { addRecipesSubCat, updateRecSubcat, getAllRecipeUnits } from '../../ApiServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'assets/images/upload3.jpg';
import TextField from '@mui/material/TextField';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

const RecipesSubcatForm = () => {
  const { state } = useLocation();
  const { editdata, imageurl, catdata } = state;
  var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  const [isupdate, setisupdate] = useState('');
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState(upload);
  const [units, setUnits] = useState([]);
  const [formValues, setFormValues] = useState([{ unit: '', cal: '', qty: '1', protein: '', fat: '', carb: '', fiber: '' }]);
  const [baseurl, setbaseurl] = useState([]);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    setbaseurl(`${process.env.REACT_APP_IMAGE_RECIPES_PATH}`);

    getAllRecipeUnits().then((response) => {
      setUnits(response.data.info);
    });
    if (state && state.editdata) {
      setisupdate(editdata._id);
      setValue('name', editdata.name);
      setNewUrl(imageurl + editdata.image);
      setFormValues(editdata.calData || []);
    }
    setdefaultLoading(false);
  }, []);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { unit: '', cal: '', qty: '1', protein: '', fat: '', carb: '', fiber: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    console.log(newFormValues);
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
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
    // alert(JSON.stringify(formValues));
    data.calData = formValues;
    // console.log(JSON.stringify(formValues));

    let formData = new FormData(); //formdata object
    formData.append('name', data.name);
    formData.append('image', data.image[0]);

    // Append the calData as a JSON string
    data.calData.forEach((calData, index) => {
      // Append each field from the calData object separately
      formData.append(`calData[${index}][unit]`, calData.unit);
      formData.append(`calData[${index}][cal]`, calData.cal);
      formData.append(`calData[${index}][qty]`, calData.qty);
      formData.append(`calData[${index}][protein]`, calData.protein);
      formData.append(`calData[${index}][fat]`, calData.fat);
      formData.append(`calData[${index}][carb]`, calData.carb);
      formData.append(`calData[${index}][fiber]`, calData.fiber);
    });
    console.log(formData);
    isupdate === ''
      ? addRecipesSubCat(formData, catdata._id)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Added successfully!');
            navigate('/recipes/recipessubcat', { state: { catdata: catdata, imageurl: baseurl } });
          })
          .catch((err) => {
            console.log(err);
            if (!err.response.data.isSuccess) {
              toast.error(err.response.data.message);
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
      : updateRecSubcat(formData, isupdate)
          .then(() => {
            localStorage.setItem('redirectSuccess', 'true');
            localStorage.setItem('redirectMessage', 'Updated successfully!');
            navigate('/recipes/recipessubcat', { state: { catdata: catdata, imageurl: baseurl } });
          })
          .catch((err) => {
            if (!err.response.data.isSuccess) {
              toast.error(err.response.data.message);
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
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" className="subHead">
              <a href="/fitness-app/backend/recipes">{catdata.name}</a> &gt; {isupdate === '' ? 'Add' : 'Update'} SubCategory
            </Typography>
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
                        id="name"
                        name="name"
                        label="name"
                        inputRef={register('name', { required: true })}
                        error={!!errors.name}
                        helperText={errors.name && 'name is required'} // Display the error message here
                        placeholder="name"
                        defaultValue={getValues('name')}
                        onChange={(e) => setValue('name', e.target.value)}
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
                    {formValues.map((element, index) => (
                      <div className="form-inline" key={index}>
                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Unit"
                          name="unit"
                          margin="normal"
                          placeholder="Unit"
                          select
                          variant="outlined" // Add this line
                          value={element.unit || ''}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '10%' }}
                          required
                        >
                          {units.map((unit) => (
                            <MenuItem key={unit._id} value={unit._id}>
                              {unit.name}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Qty"
                          margin="normal"
                          type="text"
                          placeholder="Qty"
                          name="qty"
                          value="1"
                          onChange={(e) => handleChange(index, e)}
                          disabled={true}
                          variant="outlined"
                          style={{ width: '10%' }}
                          required
                        />

                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Calory"
                          margin="normal"
                          placeholder="Calory"
                          type="text"
                          name="cal"
                          variant="outlined"
                          value={element.cal || ''}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '10%' }}
                          required
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Protein"
                          margin="normal"
                          placeholder="Protein"
                          type="text"
                          name="protein"
                          variant="outlined"
                          value={element.protein || ''}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '10%' }}
                          required
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Carb"
                          margin="normal"
                          placeholder="Carb"
                          type="text"
                          name="carb"
                          variant="outlined"
                          value={element.carb || ''}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '10%' }}
                          required
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Fat"
                          margin="normal"
                          placeholder="Fat"
                          type="text"
                          name="fat"
                          variant="outlined"
                          value={element.fat || ''}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '10%' }}
                          required
                        />
                        <TextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          label="Fiber"
                          margin="normal"
                          placeholder="Fiber"
                          type="text"
                          name="fiber"
                          variant="outlined"
                          value={element.fiber || ''}
                          onChange={(e) => handleChange(index, e)}
                          style={{ width: '10%' }}
                          required
                        />

                        {index ? (
                          <Button
                            margin="normal"
                            type="button"
                            variant="outlined"
                            size="medium"
                            color="error"
                            className="button remove"
                            endIcon={<CloseOutlined />}
                            style={{ width: '10%' }}
                            onClick={() => removeFormFields(index)}
                          >
                            REMOVE
                          </Button>
                        ) : null}
                      </div>
                    ))}
                    <div className="button-section">
                      <Button
                        variant="outlined"
                        size="medium"
                        color="success"
                        className="button add"
                        type="button"
                        style={{ width: '10%' }}
                        endIcon={<PlusCircleOutlined />}
                        onClick={() => addFormFields()}
                      >
                        ADD
                      </Button>
                      {/* <button className="button submit" type="submit">
                        Submit
                      </button> */}
                    </div>
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

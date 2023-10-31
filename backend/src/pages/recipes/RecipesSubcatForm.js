import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography, CircularProgress, Input, FormHelperText, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import CustomInput from 'components/CustomInput';
import MainCard from 'components/MainCard';
import { useForm, Controller } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { addRecipes, updateRecipes, getAllRecipeUnits } from '../../ApiServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'assets/images/upload3.jpg';
import TextField from '@mui/material/TextField';

const RecipesSubcatForm = () => {
  const { state } = useLocation();

  var [defaultLoading, setdefaultLoading] = useState(true);
  var [isLoading, setIsLoading] = useState(false);
  const [isupdate, setisupdate] = useState('');
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [newUrl, setNewUrl] = useState(upload);
  const [units, setUnits] = useState([]);
  const [formValues, setFormValues] = useState([{ unit: '', cal: '', qty: '1', protein: '', fat: '', carb: '', fiber: '' }]);
  // const [lastData, setLastData] = useState([]);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    getAllRecipeUnits().then((response) => {
      setUnits(response.data.info);
    });

    if (state) {
      const { editdata, imageurl } = state;
      setisupdate(editdata._id);
      setValue('name', editdata.name);
      setNewUrl(imageurl + editdata.image);
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
    alert(JSON.stringify(formValues));
    data.calValues = formValues;
    console.log(data);

    let formData = new FormData(); //formdata object
    Object.keys(data).forEach(function (key) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    console.log(formData);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{isupdate === '' ? 'Add' : 'Update'} Recipe SubCategory</Typography>
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
                          style={{ width: '20%' }}
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
                          style={{ width: '15%' }}
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
                          style={{ width: '15%' }}
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
                          style={{ width: '15%' }}
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
                          style={{ width: '15%' }}
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
                          style={{ width: '15%' }}
                        />

                        {/* <select name="unit" value={element.unit || ''} onChange={(e) => handleChange(index, e)} variant="outlined">
                          <option value="">Select Unit</option>
                          {units.map((unit) => {
                            return (
                              <option key={unit._id} value={unit._id}>
                                {unit.name}
                              </option>
                            );
                          })}
                        </select> */}

                        {index ? (
                          <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
                            Remove
                          </button>
                        ) : null}
                      </div>
                    ))}
                    <div className="button-section">
                      <button className="button add" type="button" onClick={() => addFormFields()}>
                        Add
                      </button>
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

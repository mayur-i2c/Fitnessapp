import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTrackedMeal } from '../../ApiServices';
import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import avatar1 from 'assets/images/users/avatar-1.png';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Insights = () => {
  const { state } = useLocation();
  const insightdata = state.insightdata;
  const [info, setInfo] = useState(null);
  const userdata = state.userdata;
  const [newUrl, setNewUrl] = useState('');
  const [month, day, year] = insightdata.date.split('/');
  const new_date = `${day}/${month}/${year}`;
  const insightData = async () => {
    try {
      const response = await getAllTrackedMeal(insightdata);
      const { info } = response.data;
      userdata.image ? setNewUrl(`${process.env.REACT_APP_API_KEY_IMAGE_PATH}/${userdata.image}`) : avatar1;
      setInfo(info);
      console.log(info);
    } catch (err) {
      console.error(err);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    insightData();
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Format the date in mm/dd/yyyy format
    const formattedDate = date ? dayjs(date).format('MM/DD/YYYY') : null;
    // Use the formatted date as needed
    console.log('Formatted Date:', formattedDate);
    // Additional logic here
    setSelectedDate(date);
  };
  if (!info) {
    return <p>Loading</p>;
  }
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={10} lg={10}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 3 }} style={{ padding: '4px 20px' }}>
              <Grid item sm={1}>
                <img src={newUrl} alt="Profile" width={50} height={50} style={{ borderRadius: '50%' }} />
              </Grid>
              <Grid item sm={5}>
                <div>
                  <Typography variant="h5">{userdata.name}</Typography>
                </div>
              </Grid>

              <Grid item sm={4}>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant="h6" style={{ marginRight: '8px' }}>
                    <EmailOutlinedIcon />
                  </Typography>
                  <Typography variant="h6">{userdata.email}</Typography>
                </div>
              </Grid>

              <Grid item sm={2}>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant="h6">
                    <LocalPhoneOutlinedIcon style={{ marginRight: '8px' }} />
                    {userdata.mo_no}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        {/* <MainCard sx={{ mt: 2 }} content={false} spacing={3}> */}
        <Stack spacing={3} sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Choose Date" value={selectedDate} onChange={handleDateChange} />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
        {/* </MainCard> */}
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        {Object.keys(info.recipes).map((meal, index) => (
          <MainCard sx={{ mt: 2 }} content={false} key={index}>
            <Stack>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ pt: 1 }}
                style={{ borderBottom: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', background: '#8080803d' }}
                key={index}
              >
                <Grid item sm={1} style={{ textAlign: 'center', paddingTop: '6px' }}>
                  <ArrowCircleRightOutlinedIcon width={20} height={20} style={{ borderRadius: '50%' }} />
                </Grid>
                <Grid item sm={8}>
                  <div>
                    <Typography variant="h5">{meal.toUpperCase()}</Typography>
                  </div>
                </Grid>

                <Grid item sm={3}>
                  <div>
                    <Typography variant="h6" className="textcenter">
                      {info.recipes[meal].totalUsedCalories} of {info.recipes[meal].totalCalory} Cal &nbsp;
                      <span style={{ color: '#0f958e' }}>[{info.recipes[meal].cal_per}%]</span>
                    </Typography>
                  </div>
                </Grid>
              </Grid>

              <div>
                <Accordion fullWidth>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: '#a2b2eb7d', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '20px' }}
                  >
                    <Typography variant="h6">Recipes &nbsp;({Object.keys(info.recipes[meal].receipes).length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {info.recipes[meal].receipes.length > 0 ? (
                      info.recipes[meal].receipes.map((recipe, recipeIndex) => (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ pt: 2 }}
                          style={{ marginTop: '0px' }}
                          key={recipeIndex}
                        >
                          <Grid item sm={1} style={{ textAlign: 'center', paddingTop: '6px' }}>
                            <ChevronRightOutlinedIcon width={20} height={20} style={{ borderRadius: '50%' }} />
                          </Grid>
                          <Grid item sm={10}>
                            <Typography variant="h6">{recipe.subcatid.name}</Typography>
                            <Typography variant="h8">
                              {recipe.qty} {recipe.unitid.name}
                            </Typography>
                          </Grid>

                          <Grid item sm={1}>
                            <div>
                              <Typography variant="h6">{recipe.cal} Cal</Typography>
                            </div>
                          </Grid>
                        </Grid>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center' }} spacing={3}>
                        <Typography variant="h6">No recipes available.</Typography>
                      </div>
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
              <div>
                <Accordion fullWidth>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: 'antiquewhite', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minHeight: '20px' }}
                  >
                    <Typography variant="h6">Macronutrients Breakup</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      {Object.keys(info.recipes[meal].macronutrients).map((mealType, index) => (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ pt: 2 }}
                          style={{ marginTop: '0px' }}
                          key={index}
                        >
                          <Grid item sm={1} style={{ textAlign: 'center', paddingTop: '6px' }}>
                            <ChevronRightOutlinedIcon width={20} height={20} style={{ borderRadius: '50%' }} />
                          </Grid>
                          <Grid item sm={5}>
                            <Typography variant="h6">{mealType}</Typography>
                          </Grid>

                          <Grid item sm={5}>
                            <Typography variant="h8">
                              {info.recipes[meal].macronutrients[mealType].used} g/ {info.recipes[meal].macronutrients[mealType].total} g
                            </Typography>
                          </Grid>

                          <Grid item sm={1}>
                            <div>
                              <Typography variant="h6">{info.recipes[meal].macronutrients[mealType].percent} %</Typography>
                            </div>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Stack>
          </MainCard>
        ))}
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 3 }} style={{ background: '#80808026' }}>
              <Grid item sm={8}>
                <Typography variant="h5">Macronutrients Breakup</Typography>
              </Grid>
              <Grid item sm={1}>
                <RestaurantMenuOutlinedIcon
                  style={{ border: '1px solid', color: 'orange', borderRadius: '50%', width: '40px', height: '40px', padding: '7px' }}
                />
              </Grid>
              <Grid item sm={3}>
                <div>
                  <Typography variant="h5">
                    {info.totalUsedCal} of {info.totalCal} Cal <Typography variant="subtitle">[{info.cal_per}%]</Typography>
                  </Typography>

                  <Typography variant="h6">{new_date}</Typography>
                </div>
              </Grid>
            </Grid>
          </Stack>

          <div>
            {Object.keys(info.macronutrients).map((mealType, index) => (
              <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2 }} style={{ marginTop: '0px' }} key={index}>
                <Grid item sm={1} style={{ textAlign: 'center', paddingTop: '6px' }}>
                  <ChevronRightOutlinedIcon width={20} height={20} style={{ borderRadius: '50%' }} />
                </Grid>
                <Grid item sm={5}>
                  <Typography variant="h6">{mealType}</Typography>
                </Grid>

                <Grid item sm={5}>
                  <Typography variant="h8">
                    {info.macronutrients[mealType].used} g/ {info.macronutrients[mealType].total} g
                  </Typography>
                </Grid>

                <Grid item sm={1}>
                  <div>
                    <Typography variant="h6">{info.macronutrients[mealType].percent} %</Typography>
                  </div>
                </Grid>
              </Grid>
            ))}
          </div>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Insights;

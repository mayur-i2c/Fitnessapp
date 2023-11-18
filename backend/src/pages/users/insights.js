import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTrackedMeal } from '../../ApiServices';
import { Grid, Stack, Typography, CircularProgress } from '@mui/material';
import MainCard from 'components/MainCard';
import no_profile from 'assets/images/users/no_profile.jpeg';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
  const [calData, setCalData] = useState(false);
  const insightData = async (userid, date) => {
    try {
      const reqData = {
        userid: userid,
        date: date
      };
      userdata.image ? setNewUrl(`${process.env.REACT_APP_API_KEY_IMAGE_PATH}/${userdata.image}`) : setNewUrl(no_profile);
      const response = await getAllTrackedMeal(reqData);
      const { info } = response.data;

      setInfo(info);
      setCalData(true);
      console.log(info);
    } catch (err) {
      console.error(err);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    insightData(insightdata.userid, insightdata.date);
  }, []);

  const [selectedDate, setSelectedDate] = useState(dayjs(new_date, 'DD/MM/YYYY'));
  const [newSelectedDate, setNewSelectedDate] = useState(new_date);

  const handleDateChange = (date) => {
    // Format the date in mm/dd/yyyy format
    const formattedDate = date ? dayjs(date).format('MM/DD/YYYY') : null;
    setCalData(false);
    insightData(insightdata.userid, formattedDate);

    // Additional logic here
    setSelectedDate(date);
    const newformattedDate = date ? dayjs(date).format('DD/MM/YYYY') : null;
    setNewSelectedDate(newformattedDate);
  };

  return (
    <div>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} md={6} lg={6}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Stack spacing={3}>
              <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 3 }} className="udiv">
                <Grid item sm={1}>
                  <img src={newUrl} alt="Profile" width={50} height={50} className="border50" />
                </Grid>
                <Grid item sm={7}>
                  <div>
                    <Typography variant="h5">{userdata.name}</Typography>
                    <Typography variant="h6" className="mr-8">
                      {userdata.email}
                    </Typography>
                  </div>
                </Grid>

                <Grid item sm={4}>
                  <div className="mo-div">
                    <Typography variant="h6">
                      <LocalPhoneOutlinedIcon className="mr-6" />
                    </Typography>
                    <Typography variant="h6">{userdata.mo_no}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6} lg={6} className="dateRight">
          <Stack spacing={3} sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              {/* <DemoContainer components={['DatePicker']}> */}
              <DatePicker label="Choose Date" value={selectedDate} onChange={handleDateChange} format="DD/MM/YYYY" />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </Stack>
        </Grid>
      </Grid>
      {calData ? (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} md={6} lg={6}>
            {Object.keys(info.recipes).map((meal, index) => (
              <MainCard sx={{ mt: 2 }} content={false} key={index}>
                <Stack>
                  <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 1 }} className="mealCalDiv" key={index}>
                    <Grid item sm={1} className="arrowStyle">
                      <ArrowCircleRightOutlinedIcon width={20} height={20} className="border50" />
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
                          <span className="calperColor">[{info.recipes[meal].cal_per}%]</span>
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
                        className="recipesHeader"
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
                              className="mt-0"
                              key={recipeIndex}
                            >
                              <Grid item sm={1} className="arrowStyle">
                                <ChevronRightOutlinedIcon width={20} height={20} className="border50" />
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
                          <div className="text-center" spacing={3}>
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
                        className="nutrientHeader"
                      >
                        <Typography variant="h6">Macronutrients Breakup</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          {Object.keys(info.recipes[meal].macronutrients).map((mealType, index) => (
                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2 }} className="mt-0" key={index}>
                              <Grid item sm={1} className="arrowStyle">
                                <ChevronRightOutlinedIcon width={20} height={20} className="border50" />
                              </Grid>
                              <Grid item sm={5}>
                                <Typography variant="h6">{mealType}</Typography>
                              </Grid>

                              <Grid item sm={5}>
                                <Typography variant="h8">
                                  {info.recipes[meal].macronutrients[mealType].used} g/ {info.recipes[meal].macronutrients[mealType].total}{' '}
                                  g
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
            <MainCard sx={{ mt: 2 }} content={false} className="mainborder">
              <Stack spacing={3}>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 3 }} className="allNutrientDiv">
                  <Grid item sm={7}>
                    <Typography variant="h5">Macronutrients Breakup</Typography>
                  </Grid>
                  <Grid item sm={1}>
                    <RestaurantMenuOutlinedIcon className="resIcon" />
                  </Grid>
                  <Grid item sm={4}>
                    <div>
                      <Typography variant="h5">
                        {info.totalUsedCal} of {info.totalCal} Cal <Typography variant="subtitle">[{info.cal_per}%]</Typography>
                      </Typography>

                      <Typography variant="h6">{newSelectedDate}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Stack>

              <div>
                {Object.keys(info.macronutrients).map((mealType, index) => (
                  <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2 }} className="mt-0" key={index}>
                    <Grid item sm={1} className="arrowStyle">
                      <ChevronRightOutlinedIcon width={20} height={20} className="border50" />
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
      ) : (
        <Grid item xs={12} className="circularIcon">
          <CircularProgress size={26} fullWidth />
        </Grid>
      )}
    </div>
  );
};

export default Insights;

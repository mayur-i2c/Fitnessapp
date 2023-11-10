import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTrackedMeal } from '../../ApiServices';
import { Grid, Stack, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Cake, Kitchen } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import avatar1 from 'assets/images/users/avatar-1.png';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const Insights = () => {
  const { state } = useLocation();
  const insightdata = state.insightdata;
  const [info, setInfo] = useState(null);
  const userdata = state.userdata;
  const [newUrl, setNewUrl] = useState('');

  console.log(userdata);

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

  if (!info) {
    return <p>Loading...</p>;
  }

  return (
    // <Container maxWidth="md" className="insights-container">
    //   <Typography variant="h4" className="title">
    //     Detail Page
    //   </Typography>

    //   {/* Part 1: Info Section */}
    //   <Paper elevation={3} className="info-section">
    //     <Typography variant="subtitle1">Total Calories: {info.totalCal}</Typography>
    //     <Typography variant="subtitle1">Total Used Calories: {info.totalUsedCal}</Typography>
    //   </Paper>

    //   {/* Part 2: Recipes Section */}
    //   <div className="recipes-section">
    //     <Typography variant="h5" className="title">
    //       Recipes
    //     </Typography>
    //     {Object.keys(info.recipes).map((meal, index) => (
    //       <Paper key={index} elevation={3} className="recipe">
    //         <Typography variant="h6" className="meal-title">
    //           {meal}
    //         </Typography>
    //         <Typography variant="subtitle1">Total Calories: {info.recipes[meal][`total${meal}Calory`]}</Typography>
    //         <Typography variant="subtitle1">Total Used Calories: {info.recipes[meal].totalUsedCalories}</Typography>
    //         <List>
    //           {info.recipes[meal].receipes.map((recipe, recipeIndex) => (
    //             <div key={recipeIndex}>
    //               <ListItem>
    //                 <ListItemIcon>
    //                   <Cake />
    //                 </ListItemIcon>
    //                 <ListItemText primary={`Recipe ID: ${recipe._id}`} />
    //               </ListItem>
    //               <ListItem>
    //                 <ListItemIcon>
    //                   <Kitchen />
    //                 </ListItemIcon>
    //                 <ListItemText primary={`Calories: ${recipe.cal}`} />
    //               </ListItem>
    //               <Divider />
    //             </div>
    //           ))}
    //         </List>
    //       </Paper>
    //     ))}
    //   </div>
    // </Container>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={6} lg={6}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
              <Grid item sm={1}>
                <img src={newUrl} alt="Profile" width={50} height={50} style={{ borderRadius: '50%' }} />
              </Grid>
              <Grid item sm={7}>
                <div>
                  <Typography variant="h5">{userdata.name}</Typography>
                  <Typography variant="h6">{userdata.email}</Typography>
                </div>
              </Grid>
              <Grid item sm={1}>
                <RestaurantMenuOutlinedIcon
                  style={{ border: '1px solid', color: 'orange', borderRadius: '50%', width: '40px', height: '40px', padding: '7px' }}
                />
              </Grid>
              <Grid item sm={3}>
                <div>
                  <Typography variant="h5">
                    {info.totalUsedCal} of {info.totalCal} Cal
                  </Typography>
                  <Typography variant="h6">Today</Typography>
                </div>
              </Grid>
            </Grid>
          </Stack>
        </MainCard>

        {Object.keys(info.recipes).map((meal, index) => (
          <MainCard sx={{ mt: 2 }} content={false} style={{ paddingBottom: '10px' }}>
            <Stack spacing={3}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ pt: 1 }}
                style={{ borderBottom: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', background: '#8080803d' }}
              >
                <Grid item sm={1} style={{ textAlign: 'center', paddingTop: '6px' }}>
                  <ArrowCircleRightOutlinedIcon width={20} height={20} style={{ borderRadius: '50%' }} />
                </Grid>
                <Grid item sm={9}>
                  <div>
                    <Typography variant="h5">{meal.toUpperCase()}</Typography>
                  </div>
                </Grid>

                <Grid item sm={2}>
                  <div>
                    <Typography variant="h6">
                      {info.recipes[meal].totalUsedCalories} of {info.recipes[meal].totalCalory} Cal
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              {info.recipes[meal].receipes.length > 0 ? (
                info.recipes[meal].receipes.map((recipe, recipeIndex) => (
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ pt: 2, pl: 3, pr: 3 }}
                    style={{ marginTop: '0px' }}
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
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h6">No recipes available.</Typography>
                </div>
              )}
            </Stack>
          </MainCard>
        ))}
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Change Password</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid xs={12} sx={{ p: 3 }}>
              sdfdsf
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Insights;

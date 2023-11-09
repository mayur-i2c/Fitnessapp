import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTrackedMeal } from '../../ApiServices';
import { Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Cake, Kitchen } from '@mui/icons-material';

const Insights = () => {
  const { state } = useLocation();
  const insightdata = state.insightdata;
  const [info, setInfo] = useState(null);

  const insightData = async () => {
    try {
      const response = await getAllTrackedMeal(insightdata);
      const { info } = response.data;
      setInfo(info);
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
    <Container maxWidth="md" className="insights-container">
      <Typography variant="h4" className="title">
        Detail Page
      </Typography>

      {/* Part 1: Info Section */}
      <Paper elevation={3} className="info-section">
        <Typography variant="subtitle1">Total Calories: {info.totalCal}</Typography>
        <Typography variant="subtitle1">Total Used Calories: {info.totalUsedCal}</Typography>
      </Paper>

      {/* Part 2: Recipes Section */}
      <div className="recipes-section">
        <Typography variant="h5" className="title">
          Recipes
        </Typography>
        {Object.keys(info.recipes).map((meal, index) => (
          <Paper key={index} elevation={3} className="recipe">
            <Typography variant="h6" className="meal-title">
              {meal}
            </Typography>
            <Typography variant="subtitle1">Total Calories: {info.recipes[meal][`total${meal}Calory`]}</Typography>
            <Typography variant="subtitle1">Total Used Calories: {info.recipes[meal].totalUsedCalories}</Typography>
            <List>
              {info.recipes[meal].receipes.map((recipe, recipeIndex) => (
                <div key={recipeIndex}>
                  <ListItem>
                    <ListItemIcon>
                      <Cake />
                    </ListItemIcon>
                    <ListItemText primary={`Recipe ID: ${recipe._id}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Kitchen />
                    </ListItemIcon>
                    <ListItemText primary={`Calories: ${recipe.cal}`} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default Insights;

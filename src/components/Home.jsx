import React from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }} data-cy="home-page">
      <Typography variant="h3" gutterBottom data-cy="home-title">
        Welcome to Recipe Manager
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }} data-cy="home-description">
        Create, view, edit, rate, and organize your favorite recipes with ease.
      </Typography>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => navigate('/add')}
          data-cy="add-recipe-btn"
        >
          Add Recipe
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/list')}
          data-cy="view-recipes-btn"
        >
          View Recipes
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;

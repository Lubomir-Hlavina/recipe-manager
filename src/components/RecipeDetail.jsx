import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import StarRating from './StarRating';

const RecipeDetail = ({ recipe, onBack }) => {
  if (!recipe) return null;

  return (
    <Card sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {recipe.title}
        </Typography>
        <Chip label={recipe.category} sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Ingredients:</strong> {recipe.ingredients}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Vegetarian:</strong> {recipe.vegetarian ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Rating:</strong>
          </Typography>
          <StarRating value={recipe.rating || 0} readOnly />
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <Button onClick={onBack} variant="contained" sx={{ mt: 2 }}>
          Back to list
        </Button>
      </Box>
    </Card>
  );
};

export default RecipeDetail;

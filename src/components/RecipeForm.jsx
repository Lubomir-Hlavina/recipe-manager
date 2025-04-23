import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import StarRating from './StarRating';

const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

const RecipeForm = ({ onAdd, initialData, onBackToList }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'Main Course');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || '');
  const [vegetarian, setVegetarian] = useState(initialData?.vegetarian || false);
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 3);
  const [rating, setRating] = useState(initialData?.rating || 0);

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !ingredients.trim() || rating === 0) {
      setError('Please fill in all required fields including a rating!');
      return;
    }

    onAdd({ title, category, ingredients, vegetarian, difficulty, rating });

    setTitle('');
    setIngredients('');
    setVegetarian(false);
    setDifficulty(3);
    setRating(0);
    setError('');
    setShowSuccess(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'grid', gap: 2, width: '100%', maxWidth: '900px', mx: 'auto' }}
    >
      <TextField
        label="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
          />
        }
        label="Vegetarian"
      />

      <Box>
        <Typography gutterBottom>Difficulty</Typography>
        <Slider
          value={difficulty}
          onChange={(e, v) => setDifficulty(v)}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography gutterBottom>Rating (required)</Typography>
        <StarRating value={rating} onChange={setRating} />
        {rating === 0 && (
          <Typography color="error" variant="caption">
            Please select a rating
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" type="submit">
          {initialData ? 'Update Recipe' : 'Add Recipe'}
        </Button>
        <Button variant="outlined" onClick={onBackToList}>
          Back to List
        </Button>
      </Stack>

      {/* Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          {initialData ? 'Recipe updated!' : 'Recipe successfully added!'}
        </Alert>
      </Snackbar>

      {/* Error */}
      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default RecipeForm;

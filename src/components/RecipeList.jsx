import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { difficultyLabels } from '../constants';

const RecipeList = ({ recipes, onDelete, onEdit, onView }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [vegetarianFilter, setVegetarianFilter] = useState('');
  const [sort, setSort] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState(0);

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((recipe) =>
      categoryFilter ? recipe.category === categoryFilter : true
    )
    .filter((recipe) =>
      vegetarianFilter === ''
        ? true
        : vegetarianFilter === 'yes'
        ? recipe.vegetarian
        : !recipe.vegetarian
    )
    .filter((recipe) =>
      recipe.rating >= minRatingFilter
    )
    .sort((a, b) => {
      switch (sort) {
        case 'asc':
          return a.difficulty - b.difficulty;
        case 'desc':
          return b.difficulty - a.difficulty;
        case 'ratingAsc':
          return (a.rating || 0) - (b.rating || 0);
        case 'ratingDesc':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }} data-cy="recipe-list">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-cy="search-input"
        />
        <FormControl sx={{ minWidth: 120 }} data-cy="filter-category">
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Appetizer">Appetizer</MenuItem>
            <MenuItem value="Main Course">Main Course</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 140 }} data-cy="filter-vegetarian">
          <InputLabel>Vegetarian</InputLabel>
          <Select
            value={vegetarianFilter}
            onChange={(e) => setVegetarianFilter(e.target.value)}
            label="Vegetarian"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} data-cy="sort-select">
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Difficulty: Low to High</MenuItem>
            <MenuItem value="desc">Difficulty: High to Low</MenuItem>
            <MenuItem value="ratingAsc">Rating: Low to High</MenuItem>
            <MenuItem value="ratingDesc">Rating: High to Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} data-cy="filter-rating">
          <InputLabel>Min Rating</InputLabel>
          <Select
            value={minRatingFilter}
            onChange={(e) => setMinRatingFilter(Number(e.target.value))}
            label="Min Rating"
          >
            <MenuItem value={0}>All Ratings</MenuItem>
            <MenuItem value={1}>★ and up</MenuItem>
            <MenuItem value={2}>★★ and up</MenuItem>
            <MenuItem value={3}>★★★ and up</MenuItem>
            <MenuItem value={4}>★★★★ and up</MenuItem>
            <MenuItem value={5}>★★★★★ only</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {filteredRecipes.length === 0 ? (
        <Typography variant="h6" align="center" data-cy="no-recipes-found">
          No matching recipes found.
        </Typography>
      ) : (
        <Stack spacing={2} data-cy="recipes-list">
          {filteredRecipes.map((recipe, index) => (
            <Card
              key={index}
              sx={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => onView(index)}
              data-cy={`recipe-card-${index}`}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" data-cy={`recipe-title-${index}`}>
                    {recipe.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(index);
                      }}
                      data-cy={`edit-recipe-${index}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                      }}
                      data-cy={`delete-recipe-${index}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Box>

                <Rating
                  value={recipe.rating || 0}
                  readOnly
                  size="small"
                  sx={{ mt: 0.5 }}
                  data-cy={`recipe-rating-${index}`}
                />

                <Chip
                  label={recipe.category}
                  size="small"
                  sx={{ mt: 1, mb: 1 }}
                  data-cy={`recipe-category-${index}`}
                />

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  <strong>Difficulty:</strong> {difficultyLabels[recipe.difficulty]}
                </Typography>

                <Typography variant="body2" color="text.secondary" data-cy={`recipe-ingredients-${index}`}>
                  {recipe.ingredients.length > 60
                    ? recipe.ingredients.substring(0, 60) + '...'
                    : recipe.ingredients}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default RecipeList;

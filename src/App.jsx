import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './index.css';

const API_URL = 'http://localhost:3001/recipes';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [viewIndex, setViewIndex] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setRecipes)
      .catch(console.error);
  }, []);

  const handleAdd = (recipe) => {
    if (editIndex !== null) {
      const updatedRecipe = { ...recipe, id: recipes[editIndex].id };

      fetch(`${API_URL}/${updatedRecipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      })
        .then((res) => res.json())
        .then((data) => {
          const updated = [...recipes];
          updated[editIndex] = data;
          setRecipes(updated);
          setEditIndex(null);
        });
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      })
        .then((res) => res.json())
        .then((newRecipe) => setRecipes([...recipes, newRecipe]));
    }
  };

  const handleDelete = (index) => {
    const recipeToDelete = recipes[index];
    fetch(`${API_URL}/${recipeToDelete.id}`, { method: 'DELETE' })
      .then(() => {
        setRecipes(recipes.filter((_, i) => i !== index));
        if (viewIndex === index) setViewIndex(null);
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
    setViewIndex(null);
  };

  const handleView = (index) => {
    setViewIndex(index);
  };

  return (
    <>
      <AppBar position="static" sx={{ m: 0, p: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recipe Manager
          </Typography>
          <Button color="inherit" onClick={() => {
            setShowForm(true);
            setViewIndex(null);
            setEditIndex(null);
          }}>
            Add Recipe
          </Button>
          <Button color="inherit" onClick={() => {
            setShowForm(false);
            setViewIndex(null);
            setEditIndex(null);
          }}>
            View Recipes
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {viewIndex !== null ? (
          <RecipeDetail recipe={recipes[viewIndex]} onBack={() => setViewIndex(null)} />
        ) : showForm ? (
          <RecipeForm
            onAdd={handleAdd}
            initialData={editIndex !== null ? recipes[editIndex] : null}
            onBackToList={() => setShowForm(false)}
          />
        ) : (
          <RecipeList
            recipes={recipes}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
          />
        )}
      </Box>
    </>
  );
};

export default App;

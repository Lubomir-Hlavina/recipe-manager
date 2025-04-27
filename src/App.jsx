import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import Home from './components/Home';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './index.css';

const API_URL = 'http://localhost:3001/recipes';

const AppContent = () => {
  const [recipes, setRecipes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [viewIndex, setViewIndex] = useState(null);

  const navigate = useNavigate();

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
          navigate('/list');
        });
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      })
        .then((res) => res.json())
        .then((newRecipe) => {
          setRecipes([...recipes, newRecipe]);
          navigate('/list');
        });
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
    navigate('/add');
  };

  const handleView = (index) => {
    setViewIndex(index);
    navigate(`/detail/${index}`);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            Recipe Manager
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/add')}>Add Recipe</Button>
          <Button color="inherit" onClick={() => navigate('/list')}>View Recipes</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add"
            element={
              <RecipeForm
                onAdd={handleAdd}
                initialData={editIndex !== null ? recipes[editIndex] : null}
                onBackToList={() => navigate('/list')}
              />
            }
          />
          <Route
            path="/list"
            element={
              <RecipeList
                recipes={recipes}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={handleView}
              />
            }
          />
          <Route
            path="/detail/:id"
            element={
              viewIndex !== null && (
                <RecipeDetail
                  recipe={recipes[viewIndex]}
                  onBack={() => {
                    setViewIndex(null);
                    navigate('/list');
                  }}
                />
              )
            }
          />
        </Routes>
      </Box>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

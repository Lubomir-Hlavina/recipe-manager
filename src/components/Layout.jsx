import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const Layout = ({ children, onAddClick }) => {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Recipe Manager
          </Typography>
          <Button color="inherit" onClick={onAddClick}>
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;

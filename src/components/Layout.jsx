import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const Layout = ({ children, onAddClick }) => {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar data-cy="app-toolbar">
          <Typography variant="h6" sx={{ flexGrow: 1 }} data-cy="toolbar-title">
            Recipe Manager
          </Typography>
          <Button color="inherit" onClick={onAddClick} data-cy="toolbar-add-btn">
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }} data-cy="layout-content">
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;

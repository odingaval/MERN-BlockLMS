import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <Box>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout; 
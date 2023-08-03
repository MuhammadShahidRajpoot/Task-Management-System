import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the user is logged in 
  const isLoggedIn = localStorage.getItem('userId') !== null;


    return isLoggedIn ? <Outlet /> : <Navigate to='/' />

};

export default ProtectedRoute;

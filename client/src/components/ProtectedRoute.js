import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedUserTypes }) => {
  const userType = localStorage.getItem('userType'); // Get userType from localStorage

  // Check if the user is logged in and has the correct userType
  if (!userType || !allowedUserTypes.includes(userType)) {
    return <Navigate to="/login" />; // Redirect to login if not authorized
  }

  return <Outlet />; // Render the protected component
};

export default ProtectedRoute;
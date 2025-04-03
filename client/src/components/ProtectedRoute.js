import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedUserTypes }) => {
  const userType = localStorage.getItem('userType'); 

  // Check if the user is logged in and has the correct userType
  if (!userType || !allowedUserTypes.includes(userType)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

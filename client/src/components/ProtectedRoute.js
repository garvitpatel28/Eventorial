// components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedUserTypes }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !allowedUserTypes.includes(user.userType)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

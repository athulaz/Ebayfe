// src/utils/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  return user && user.isAdmin && token ? children : <Navigate to="/login" />;
};

export default AdminRoute;

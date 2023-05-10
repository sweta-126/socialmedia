import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const auth = user != null ? true : false;
    const location = useLocation()
  return (
    auth ? <Outlet /> : <Navigate to='/register' state = {{from: location}} replace />
  );
}

export default ProtectedRoute
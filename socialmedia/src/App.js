import React from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={ user ? <Navigate to="/" /> : <Login/>} />
        <Route exact path="/register" element={ user ? <Navigate to="/" /> : <Register /> } />
        <Route element={<ProtectedRoute />}>
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="/" element={ <Home /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';  // Using the logout action from your userSlice
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action to reset user state
    navigate('/');   // Redirect the user to the authentication page
  };

  return (
    <Button variant="contained" color='success' onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;

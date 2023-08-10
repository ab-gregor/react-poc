import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '../utils/auth';
import LogoutButton from './LogoutButton';

const Admin = () => {
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  console.log("User role from Redux:", userRole);

  useEffect(() => {
    if (!isUserAdmin(userRole)) {
      console.log("not admin")
      navigate('/');
    }
  }, [userRole, navigate]);

  if (isUserAdmin(userRole)) {
    return <><LogoutButton/><Outlet /></>;
  } else {
    return null;
  }
};

export default Admin;

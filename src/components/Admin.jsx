import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '../utils/auth';
import LogoutButton from './LogoutButton';
import AdminScreen from '../views/AdminScreen';
import Header from './HeaderHome';


const Admin = () => {
  const userRole = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user)
  const isLoading= useSelector((state)=>state.user.isLoading)

  const navigate = useNavigate();
  console.log("User role from Redux:", userRole);

//   useEffect(() => {
// //     if(!userRole)
// // {
// //   navigate('/')
// // }  
// }, [userRole]);
if(!isLoading)
  {
    if (!isUserAdmin(userRole)) {
      console.log("not admin")
      window.alert("not authenticated")
      setTimeout(()=>{
        navigate('/')
      },100);
    }
    
  if (isUserAdmin(userRole)) {
    return <><Header/><AdminScreen /></>;
  } else {
    return null;
  }
};
};
export default Admin;

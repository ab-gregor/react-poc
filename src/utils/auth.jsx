import { ROLES } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:5000/login', { username, password });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
};

export const register = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:5000/register', { username, password });
        if(response){
        return response.data;}
        
    } catch (error) {
        console.error('Registration failed:', error);
        if (error.response && error.response.status === 409) {
          window.alert("Username already taken");
          
      } else {
          console.error("Registration error:", error.message);
          
      }
        return null;
    }
};
 
export const isUserAdmin = (role) => {
    
  if(role === ROLES.ADMIN){
    return true
  }
  else {
return false
  };
};
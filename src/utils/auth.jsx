import { ROLES } from '../store/userSlice';
export const mockLogin = (username, password) => {
    if (username.includes("admin") && password === "admin") {
      return { name: username, role: ROLES.ADMIN };
    } else if (password === "user") {
      return { name: username, role: ROLES.USER };
    }
    return null;
  };
  
  export const mockRegister = (username, password) => {

    return { name: username, role: ROLES.USER };
  };
export const isUserAdmin = (role) => {
  return (role === ROLES.ADMIN);
};
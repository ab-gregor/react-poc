import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { mockLogin, mockRegister } from '../utils/auth';
import { loginUserAsync } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);  
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = mockLogin(username, password);
    
    if (user) {
        dispatch(loginUserAsync(user));
        if (user.role === 'admin') {
            console.log("User after mockLogin:", user); 
            navigate('/admin');
        } else {
            console.log("User after mockLogin:", user); 
            navigate('/products');
        }
    } else {
        console.log("not work")
    }
};


  const handleRegister = () => {
    const user = mockRegister(username, password);
    if (user) {
      dispatch(loginUserAsync(user));

    } else {
    }
  };

  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {isLoginMode ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}
      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        Switch to {isLoginMode ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default Auth;

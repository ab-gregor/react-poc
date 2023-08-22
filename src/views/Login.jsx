import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { login, register } from '../utils/auth';
import { loginUserAsync } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from "./Login.module.css";
import cartpng from "../assets/R.png"
import { TextField } from '@mui/material';
import groezeryLogo from '../assets/groezeryLogo.jpg'
import axios from 'axios';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);  
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(username, password);
    
    if (user) {
        dispatch(loginUserAsync(user));
        if (user.role === 'admin') {
            console.log("User after mockLogin:", user); 
            navigate('/admin');
        } else {
            console.log("User after mockLogin:", user); 
            navigate('/productHome');
        }
    } else {
        console.log("not work")
    }
};


  const handleRegister = () => {
    axios.post('http://localhost:5000/register', { username, password })
        .then(response => {
            const user = response.data;
            if (user) {
                dispatch(loginUserAsync(user)); 
            }
        })
        .catch(error => {
            if (error.response && (error.response.status === 409 ||error.response.status === 500)) {
                window.alert("Username already taken");
               
            } else {
                console.error("Registration error:", error.message);
                
            }
        });
  };

  return (
<>

    <span className={styles.spanContainer}>
        <div className={styles.textContainer}>
        <b className={styles.loginHeader}>Login</b>
        <br></br>
        <p className={styles.loginText}>
        Get access to your <br></br>Orders,Cart and more
        </p>
        </div>
        <img src={cartpng} className={styles.cartImage}></img>
      </span>




    <span className={styles.spanContainer2}>
        <div className={styles.loginContainer}>
            <img className={styles.logo} src={groezeryLogo}/>
      {/* <h2 className=''>{isLoginMode ? 'Login' : 'Register'}</h2> */}
      <TextField 
        className={styles.materialInput}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <TextField
        className={styles.materialInput}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br/>
      {isLoginMode ? (
        <Button 
        className={styles.materialButton} 
        variant="outlined" 
        color='success' 
        onClick={handleLogin}>Login</Button>
      ) : (
        <Button 
        className={styles.materialButton} 
        variant="outlined" 
        color='success' 
        onClick={handleRegister}>Register</Button>
      )}
      <br/>
      
      <Button 
      className={styles.materialButton} 
      variant="outlined" 
      color='success'
      onClick={() => setIsLoginMode(!isLoginMode)}>
        Switch to {isLoginMode ? 'Register' : 'Login'}
      </Button>
      </div>
    </span>
    </>
  );
};

export default Auth;

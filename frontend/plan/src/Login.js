import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase'; // Adjust the import path based on your file structure
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Login.css'; // Import the custom CSS for the login page

// Google Authentication provider
const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle email login with backend
  const handleEmailLogin = async () => {
    try {
      // Sending login request to your backend API
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const userName = response.data.user.name;
        const user_id=response.data.user._id; // Assuming the backend returns user's name in response
        localStorage.setItem('name', userName);
        localStorage.setItem('_id', user_id) // Store the name in localStorage
        alert('Login successful!');
       
        navigate('/home'); // Redirect after successful login
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.response ? error.response.data.message : 'Login failed');
    }
  };

  // Handle Google sign-in with Firebase
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userName = result.user.displayName;
      localStorage.setItem('name', userName); // Store Google user's name in localStorage
      alert(`Welcome, ${userName}`);
      navigate('/home'); // Redirect after successful login
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert(error.message);
    }
  };

  // Navigate to the registration page
  const goToRegister = () => navigate('/register');

  return (
    <div className="login-page">
      <div className="login-image-container">
        <img
          src="https://thumbs.dreamstime.com/b/baby-food-child-cook-hat-sitting-inside-vegetable-over-white-background-healthy-meal-concept-42331846.jpg"
          alt="Login Image"
          className="login-image"
        />
      </div>

      <div className="login-form-container">
        <h1 className="login-form-title">
          Log<span style={{ color: 'red' }}>in</span>
        </h1>
        <p className="login-form-subtitle">Enter your details to Login.</p>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailLogin} className="login-button">Log In</button>
        <p className="forgot-password">Forgot your Password?</p>
        <hr className="login-hr" />
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          Continue with Google
        </button>
        <p>
          Do not have an account?{' '}
          <span onClick={goToRegister} className="register-link">Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

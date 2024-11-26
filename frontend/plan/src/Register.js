import { Link } from 'react-router-dom';
import './Register.css'; // Import CSS for styling
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Correct axios import

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!agree) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
  
    try {
      // Send POST request using axios
      const response = await axios.post('http://127.0.0.1:5000/register', {
        name: name, // Use 'name' here instead of 'username'
        email: email,
        password: password,
      });
  
      // Assuming successful registration
      if (response.status === 200) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert(error.response ? error.response.data.message : 'Registration failed');
    }
  };
  

  return (
    <div className="register-page">
      {/* Navbar */}
     

      <div className="register-container">
        <div className="image-section">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkNZG_LUps3aokgyyq-hRxhtsotfd_vUvOg&s"
            alt="Register"
            className="register-image"
          />
        </div>
        <div className="form-container">
          <h1 className="form-title">Sign Up</h1>
          <p className="form-subtitle">Enter your details to register.</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <span>Terms and Conditions</span>
            </label>
          </div>
          <button className="register-button" onClick={handleRegister}>Register</button>
          <p className="signin-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

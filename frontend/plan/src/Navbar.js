import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHome } from 'react-icons/fa'; // Import icons
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaHome className="navbar-icon" onClick={() => navigate('/')} title="Home" />
        <span className="navbar-title">Snackaroo</span>
      </div>
      <div className="navbar-right">
        <FaUser className="navbar-icon" onClick={() => navigate('/login')} title="Login" />
      </div>
    </nav>
  );
};

export default Navbar;

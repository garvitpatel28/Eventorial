import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage or cookies
    const token = localStorage.getItem('token'); // Or check cookies if you're storing the token there
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage items related to the user session
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    console.log("Logged out successfully");
  
    // Redirect user to login or home page
    navigate('/login');
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/eventorial-logo.png"
            alt="Eventorial Logo"
            className="navbar-logo"
          />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/organizer-dashboard">Organizer</Link>
            </li>
            <div className="auth-buttons">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link btn-login" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn-signup" to="/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button className="nav-link btn-logout" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this CSS file exists

function Navbar() {
  // Retrieve userType from localStorage
  const userType = localStorage.getItem('userType');

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
            {/* Common Links for All Users */}
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>

            {/* Conditional Rendering Based on User Type */}
            {userType === 'user' && (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/music">Music</Link></li>
                  <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                  <li><Link className="dropdown-item" to="/conferences">Conferences</Link></li>
                </ul>
              </li>
            )}

            {userType === 'organizer' && (
              <li className="nav-item">
                <Link className="nav-link" to="/organizer-dashboard">Organizer Dashboard</Link>
              </li>
            )}

            {userType === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
            )}

            {/* Auth Buttons (Login/Signup) */}
            {!userType && (
              <div className="auth-buttons">
                <li className="nav-item">
                  <Link className="nav-link btn-login" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-signup" to="/signup">Sign Up</Link>
                </li>
              </div>
            )}

            {/* Logout Button for Logged-in Users */}
            {userType && (
              <li className="nav-item">
                <button 
                  className="nav-link btn-logout" 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userType');
                    window.location.href = '/login'; // Redirect to login page
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
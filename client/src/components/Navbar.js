import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkToken(); // Initial check
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    console.log("Logged out successfully");
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

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
            {isAuthPage ? (
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
                  <Link className="nav-link" to="/events">Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/organizer-dashboard">Organizer</Link>
                </li>
                {isLoggedIn ? (
                  <li className="nav-item">
                    <button className="nav-link btn-logout" onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link btn-login" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn-signup" to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

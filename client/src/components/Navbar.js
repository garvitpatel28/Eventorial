import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
            <li className="nav-item">
              <Link className="nav-link" to="/organizer-dashboard">Organizer</Link>
            </li>
            <div className="auth-buttons">
              <li className="nav-item">
                <Link className="nav-link btn-login" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn-signup" to="/signup">Sign Up</Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
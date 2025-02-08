import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        userType, 
      });
      alert(response.data.message); 

      // Redirect based on user type
      if (userType === 'user') {
        navigate('/events'); 
      } else if (userType === 'organizer') {
        navigate('/organizer-dashboard');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <div class="h2-container">
        <h2>Discovered tailored events.</h2>
        <h2>Sign in for personalized recommendations today!</h2>
      </div>
      <div className="signup-box">
      <h2>Sign Up</h2>
        <div className="user-type-selector">
          <label>
            <input
              type="radio"
              name="userType"
              value="user"
              checked={userType === 'user'}
              onChange={() => setUserType('user')}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="organizer"
              checked={userType === 'organizer'}
              onChange={() => setUserType('organizer')}
            />
            Organizer
          </label>
        </div>
        <div className="social-signup">
          <button className="social-button-google">
            Sign up with Google
          </button>
          <button className="social-button-facebook">
            Sign up with Facebook
          </button>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="button" className="signup-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
      alert(response.data.message);
  
      // Save token, userType, and userId
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.userType);
      localStorage.setItem('userId', response.data.userId); // Ensure userId is stored
  
      console.log("Saved Token:", response.data.token); // Debugging
      console.log("Saved UserId:", response.data.userId); // Debugging
  
      // Redirect based on userType
      if (response.data.userType === 'admin') {
        navigate('/admin-dashboard');
      } else if (response.data.userType === 'user') {
        navigate('/events');
      } else if (response.data.userType === 'organizer') {
        navigate('/organizer-dashboard');
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Login failed.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="h2-container">
        <h2>Discover tailored events.</h2>
        <h2>Sign in for personalized recommendations today!</h2>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <div className="social-login">
          <button className="social-button-google">Login with Google</button>
          <button className="social-button-facebook">Login with Facebook</button>
        </div>
        <div className="divider"><span>OR</span></div>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" className="login-button" onClick={handleLogin}>Login</button>
        </form>
        <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;

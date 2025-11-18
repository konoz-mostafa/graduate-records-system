import React, { useState } from 'react';
import { User } from 'lucide-react';
import './Register.css';

const Register = ({ onSwitchToLogin }) => {
  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    nationalId: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, nationalId, phone, password, confirmPassword } = credentials;

    if (!fullName || !email || !nationalId || !phone || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          email,
          nationalId,
          phone,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed');
        setLoading(false);
        return;
      }

      alert('Account created successfully! Please log in.');
      onSwitchToLogin();
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <User className="icon" />
            </div>
            <h1>Create Account</h1>
            <p>University Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={credentials.fullName}
                onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>National ID</label>
              <input
                type="text"
                value={credentials.nationalId}
                onChange={(e) => setCredentials({ ...credentials, nationalId: e.target.value })}
                placeholder="Enter your national ID"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={credentials.phone}
                onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Choose a password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>

            <div className="auth-switch">
              <button type="button" onClick={onSwitchToLogin} className="link-button">
                Already have an account? Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

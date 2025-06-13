import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={authenticated ? '/dashboard' : '/'}>LOGO</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/catagories">CATAGORIES</Link></li>
          <li><Link to="/gallery">GALLERY</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {authenticated ? (
          <>
            <Link to="/dashboard" className="login-btn">Dashboard</Link>
            <button onClick={handleLogout} className="signup-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">LOGIN</Link>
            <Link to="/register" className="signup-btn">SIGN UP</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
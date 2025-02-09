import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">StockTrader Pro</Link>
      </div>
      <div className="navbar-links">
        <Link to="/screener" className="nav-link">Screener</Link>
        <Link to="/portfolio" className="nav-link">Portfolio</Link>
        <Link to="/loan" className="nav-link">Instant Loan</Link>
        <Link to="/news" className="nav-link">Business News</Link>
        <Link to="/trade" className="nav-link">Trade Now</Link>
      </div>
    </nav>
  );
};

export default Navbar; 
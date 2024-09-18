import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import slalomLogo from '../assets/slalom-logo.png';
import slalomLogoBlue from '../assets/Slalom-blue.svg'; // Update this import
import { FaBars, FaTimes, FaHome, FaUsers, FaCalendarAlt, FaFileAlt, FaChartLine, FaGavel, FaClock, FaExchangeAlt, FaUserCircle } from 'react-icons/fa';

function Header({ unsignedDocuments }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(handleChange);

    return () => darkModeMediaQuery.removeListener(handleChange);
  }, []);

  const navItems = [
    { path: '/', icon: FaHome, label: 'Dashboard' },
    { path: '/shareholders', icon: FaUsers, label: 'Shareholders' },
    { path: '/events', icon: FaCalendarAlt, label: 'Events' },
    { path: '/documents', icon: FaFileAlt, label: 'Documents', badge: unsignedDocuments },
    { path: '/cashflow', icon: FaChartLine, label: 'Cashflow' },
    { path: '/dividend-auction', icon: FaGavel, label: 'Dividend Auction' },
    { path: '/vesting-schedule', icon: FaClock, label: 'Vesting' },
    { path: '/liquidity-portal', icon: FaExchangeAlt, label: 'Liquidity' },
    { path: '/profile', icon: FaUserCircle, label: 'Profile' },
  ];

  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="multi-color-line"></div>
      <div className="header-content">
        <Link to="/" className="logo">
          <img src={isDarkMode ? slalomLogoBlue : slalomLogo} alt="Slalom Logo" className="slalom-logo" />
        </Link>
        <span className="user-greeting">Welcome, Evan</span>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={isMenuOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon />
              <span>{item.label}</span>
              {item.badge > 0 && <span className="badge">{item.badge}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
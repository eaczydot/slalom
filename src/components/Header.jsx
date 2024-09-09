import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import slalomLogo from '../assets/slalom-logo.png';

const Header = memo(function Header({ unsignedDocuments }) {
  return (
    <header className="header">
      <div className="multi-color-line"></div>
      <div className="header-content">
        <div className="logo">
          <img src={slalomLogo} alt="Slalom Logo" className="slalom-logo" />
        </div>
        <nav>
          <ul>
            <li><NavLink to="/" end>Dashboard</NavLink></li>
            <li><NavLink to="/shareholders">Shareholders</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
            <li>
              <NavLink to="/documents">
                Documents
                {unsignedDocuments > 0 && <span className="badge">{unsignedDocuments}</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default Header;
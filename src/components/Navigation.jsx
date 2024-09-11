import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/">Dashboard</Link>
      <Link to="/documents">Documents</Link>
    </nav>
  );
};

export default Navigation;
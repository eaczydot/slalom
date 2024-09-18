import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/shareholders">Shareholders</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/documents">Documents</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
};

export default Navigation;
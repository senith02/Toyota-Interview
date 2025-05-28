import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-nav">
      <div className="logo">
        <NavLink to="/" end>Toyota Parts Management</NavLink>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Parts List</NavLink></li>
        <li><NavLink to="/parts/add">Add New Part</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Layout() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="container">
        <Outlet />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Vehicle Parts Inventory System</p>
      </footer>
    </div>
  );
}

export default Layout;
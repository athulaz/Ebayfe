// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Product</Link>
      <Link to="/admin">Admin Dashboard</Link>
    </nav>
  );
};

export default Navbar;

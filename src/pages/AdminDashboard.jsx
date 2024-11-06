// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <div className="admin-section">
        <h3>Product Management</h3>
        <p>Manage the products listed on the platform.</p>
        <Link to="/admin/products">View Products</Link>
      </div>

      <div className="admin-section">
        <h3>User Management</h3>
        <p>View and manage users, including blocking or unblocking them.</p>
        <Link to="/admin/users">View Users</Link>
      </div>

      <div className="admin-section">
        <h3>Order Management</h3>
        <p>Oversee orders, including tracking and updating order status.</p>
        <Link to="/admin/orders">View Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

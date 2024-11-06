// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import HomePage from './pages/HomePage';
import ProductDetail from './components/Products/ProductDetail'; // Import ProductDetail component
import CartPage from './pages/CartPage';
import CheckoutPage from './components/Checkout/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrderHistoryPage from './components/Orders/OrderHistoryPage';
import AdminDashboard from './pages/AdminDashboard';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import { ToastContainer } from 'react-toastify';
import './bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Header setSearchTerm={setSearchTerm} setCategory={setCategory} setPriceRange={setPriceRange} />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          <Routes>
            <Route 
              path="/" 
              element={<HomePage searchTerm={searchTerm} category={category} priceRange={priceRange} />} 
            />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/orders" element={<PrivateRoute><OrderHistoryPage /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
          <Footer />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

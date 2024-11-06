// src/pages/HomePage.jsx
import React from 'react';
import ProductList from '../components/Products/ProductList';

const HomePage = ({ searchTerm, category, priceRange }) => (
  <div>
    <h3  className="ms-5">Welcome to Our Store</h3>
    <ProductList searchTerm={searchTerm} category={category} priceRange={priceRange} />
  </div>
);

export default HomePage;

// src/services/api.js
import axios from 'axios';

export const fetchProducts = async () => {
  return await axios.get('/api/products');
};

export const fetchCart = async () => {
  return await axios.get('/api/cart');
};

// Add other API functions as needed

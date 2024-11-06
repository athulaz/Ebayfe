// src/services/payment.js
import axios from 'axios';

export const initializePayment = async (amount) => {
  return await axios.post('/api/orders/payment/initialize', { amount });
};

export const verifyPayment = async (paymentData) => {
  return await axios.post('/api/orders/payment/verify', paymentData);
};

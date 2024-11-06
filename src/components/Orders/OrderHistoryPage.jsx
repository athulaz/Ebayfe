// src/components/Orders/OrderHistoryPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const OrderHistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://ebaybe.onrender.com/api/orders/history', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(response.data.orders); // Set orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch order history");
      }
    };

    fetchOrders();
  }, [user.token]);

  if (!orders.length) {
    return <p>No orders found in your order history.</p>;
  }

  return (
    <div>
      <h2>Your Order History</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>Order ID: {order._id}</h3>
          <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
          <p>Order Status: {order.orderStatus}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId._id}>
                {item.productId.name} - Quantity: {item.quantity} - Price: ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;

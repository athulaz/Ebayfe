// src/components/Checkout/CheckoutPage.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CheckoutPage = () => {
  const { cart, calculateTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user || !user.token) {
      toast.error("You need to be logged in to place an order.");
      navigate('/login');
      return;
    }

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      toast.error("Please fill in all required shipping address fields.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderDetails = {
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: calculateTotalPrice(),
        shippingAddress,
        paymentMethod,
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderDetails, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate('/');
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Checkout</h2>

      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <div className="p-3 border rounded">
            <h4 className="mb-3">Shipping Address</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your postal code"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your country"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  required
                />
              </Form.Group>
            </Form>
          </div>
        </Col>

        <Col md={6}>
          <div className="p-3 border rounded">
            <h4 className="mb-3">Payment Method</h4>
            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Razorpay">Razorpay</option>
            </Form.Select>

            <h4 className="mb-3">Order Summary</h4>
            <div className="mb-3">
              {cart.map((item) => (
                <div key={item.productId} className="d-flex justify-content-between mb-2">
                  <span>{item.product.name}</span>
                  <span>${item.product.price} x {item.quantity}</span>
                </div>
              ))}
            </div>
            <h5 className="text-end">Total: ${calculateTotalPrice().toFixed(2)}</h5>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          variant="primary"
          size="lg"
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </Container>
  );
};

export default CheckoutPage;

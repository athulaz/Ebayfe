// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const CartPage = () => {
  const { cart, calculateTotalItems, calculateTotalPrice, updateCartItem, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout");
      navigate('/login');
    } else {
      toast.success("Proceeding to checkout");
      navigate('/checkout');
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    updateCartItem(productId, quantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    toast.info("Item removed from cart");
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <Row className="mb-4">
            {cart.map((item) => (
              <Col key={item.productId} md={12} className="mb-3">
                <div
                  className="d-flex justify-content-between align-items-center border-bottom pb-3"
                  style={{ paddingBottom: '10px' }}
                >
                  <div>
                    <h5 className="mb-2">{item.product.name}</h5>
                    <p className=" mb-1">Price: ${item.product.price}</p>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                      style={{ width: '70px', display: 'inline-block', marginRight: '10px' }}
                      min="1"
                    />
                    <Button variant="dark" onClick={() => handleRemove(item.productId)} size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-end">
              <h4 className="fw-bold">
                Total Items: {calculateTotalItems()} | Total Price: ${calculateTotalPrice().toFixed(2)}
              </h4>
              <Button
                variant="dark"
                onClick={handleCheckout}
                className="mt-3 w-25"
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
};

export default CartPage;

// src/components/Products/ProductDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ProductDetail = () => {
  const { products } = useContext(ProductContext);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === id);
    setProduct(foundProduct);
  }, [id, products]);

  const handleAddToCart = () => {
    if (!product) {
      toast.error("Product not found");
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    navigate('/cart');
  };

  const handleRemoveFromCart = () => {
    if (!product) {
      toast.error("Product not found");
      return;
    }

    removeFromCart(product._id);
    toast.info(`${product.name} removed from cart`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} // Updated to use product.images array
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '200px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-3">{product.name}</h2>
          <p className="">{product.description}</p>
          <h4 className="text-primary">Price: ${product.price}</h4>
          <div className="mt-4">
            <Button variant="dark" onClick={handleAddToCart} className="me-2">
              Add to Cart
            </Button>
            <Button variant="dark" onClick={handleRemoveFromCart}>
              Remove from Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

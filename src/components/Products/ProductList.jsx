// src/components/Products/ProductList.jsx
import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import './ProductList.css'; // Import a custom CSS file if you need extra styles

const ProductList = ({ searchTerm = '', category, priceRange = [0, 5000] }) => {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]);

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Products</h2>
      <Row className="g-4 justify-content-center"> {/* Added justify-content-center for centering */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center align-items-stretch">
              <Card className="h-100 border-0 shadow-sm product-card">
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card.Img
                    variant="top"
                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                    className="product-image"
                  />
                  <Card.Body className="d-flex flex-column align-items-center">
                    <Card.Title className="text-center product-title">{product.name}</Card.Title>
                    <Card.Text className="text-center product-price">
                      ${product.price}
                    </Card.Text>
                  </Card.Body>
                </Link>
                <Button
                  as={Link}
                  to={`/products/${product._id}`}
                  variant=""
                  className="mt-auto w-100 rounded-0"
                >
                  View Details
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;

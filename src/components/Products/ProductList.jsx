// src/components/Products/ProductList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row, Container, Pagination } from 'react-bootstrap';
import './ProductList.css'; // Import a custom CSS file if you need extra styles

const ProductList = ({ searchTerm = '', category, priceRange = [0, 5000] }) => {
  const { products, fetchProducts } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Products</h2>
      <Row className="g-4 justify-content-center">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={currentPage === pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default ProductList;

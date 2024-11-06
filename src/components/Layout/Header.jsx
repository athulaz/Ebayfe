// src/components/Layout/Header.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Button, Form, FormControl, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ setSearchTerm, setCategory, setPriceRange }) => {
  const { calculateTotalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => {
    // Read initial theme preference from localStorage
    return localStorage.getItem('darkMode') === 'true';
  });

  // Apply theme to the body
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#ffeb3b' : '#ffffff'; // Yellow for dark mode
    document.body.style.color = darkMode ? '#000000' : '#000000'; // Black text
  }, [darkMode]);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: darkMode ? '#ffeb3b' : '#ffffff', // Dark mode or primary color for navbar
        color: darkMode ? '#ffffff' : '#ffffff',
      }}
    >
      <Container fluid>
        {/* Left-aligned Brand */}
        <Navbar.Brand as={Link} to="/" style={{ color: darkMode ? '#000000' : '#000000' }}>
          Ebay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {/* Center-aligned Search and Filters */}
          <div className="d-flex flex-wrap align-items-center mb-3 mb-lg-0 w-100 w-lg-auto justify-content-center">
            <Form className="d-flex mx-2 mb-2 mb-lg-0">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
            <Form.Select
              aria-label="Category"
              onChange={(e) => setCategory(e.target.value)}
              className="me-2 mb-2 mb-lg-0"
              style={{ width: '150px' }}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </Form.Select>
            <div className="d-flex align-items-center">
              <FormControl
                type="number"
                placeholder="Min"
                onChange={(e) => setPriceRange((prev) => [Number(e.target.value), prev[1]])}
                className="me-2 mb-2 mb-lg-0"
                style={{ width: '70px' }}
              />
              <FormControl
                type="number"
                placeholder="Max"
                onChange={(e) => setPriceRange((prev) => [prev[0], Number(e.target.value)])}
                className="mb-2 mb-lg-0"
                style={{ width: '70px' }}
              />
            </div>
          </div>

          {/* Right-aligned Nav Links */}
          <Nav className="d-flex align-items-center flex-wrap">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart ({calculateTotalItems()})</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            {user ? (
              <Nav.Link as={Button} variant="link" onClick={logout} className="ms-2 text-decoration-none">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
            {/* Small Dark/White Mode Toggle Button */}
            <Button
              variant="outline-dark"
              size="sm"
              onClick={toggleDarkMode}
              className="ms-3"
            >
              {darkMode ? '☀️' : '🌙'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

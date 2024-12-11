import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img
          src="/FlavorFusion Logo.png"
          alt="FlavorFusion Logo"
          className="header-logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="custom-nav"> {}
          <Nav.Link as={Link} to="/saved-recipes">❤️ Saved Recipes </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

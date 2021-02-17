import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" variant="light" fixed="top">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/assets/wac_logo_full.png"
          width="auto"
          height="30"
          className="d-inline-block align-top"
          alt="WAC Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/keynote">
            Keynote
          </Nav.Link>
          <Nav.Link as={Link} to="/addresses">
            Addresses
          </Nav.Link>
          <Nav.Link as={Link} to="/plenaries">
            Plenaries
          </Nav.Link>
          <Nav.Link as={Link} to="/faq">
            FAQ
          </Nav.Link>
          <Nav.Link as={Link} to="/schedule">
            Recordings
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to="/team">
            Team
          </Nav.Link>
          <Nav.Link as={Link} to="/startups">
            Startups
          </Nav.Link>
        </Nav>
        <Nav className="float-lg-right">
          <Nav.Link as={Link} to="/sprint">
            <Button variant="outline-danger">SPRINT</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

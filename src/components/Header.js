import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import Logo from '../img/general/wac_logo_full.png';

const Header = () => {
  const [expand, setExpand] = useState(false);
  return (
    <Navbar
      bg="light"
      expand="lg"
      variant="light"
      fixed="top"
      expanded={expand}
    >
      <Navbar.Brand as={Link} to="/">
        <img
          src={Logo}
          width="auto"
          height="30"
          className="d-inline-block align-top"
          alt="WAC Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpand((prev) => !prev)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/keynote" onClick={() => setExpand(false)}>
            Keynote
          </Nav.Link>
          <Nav.Link as={Link} to="/addresses" onClick={() => setExpand(false)}>
            Addresses
          </Nav.Link>
          <Nav.Link as={Link} to="/plenaries" onClick={() => setExpand(false)}>
            Plenaries
          </Nav.Link>
          <Nav.Link as={Link} to="/faq" onClick={() => setExpand(false)}>
            FAQ
          </Nav.Link>
          <Nav.Link as={Link} to="/schedule" onClick={() => setExpand(false)}>
            Recordings
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={() => setExpand(false)}>
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to="/team" onClick={() => setExpand(false)}>
            Team
          </Nav.Link>
          <Nav.Link as={Link} to="/startups" onClick={() => setExpand(false)}>
            Startups
          </Nav.Link>
        </Nav>
        <Nav className="float-lg-right">
          <Nav.Link as={Link} to="/sprint" onClick={() => setExpand(false)}>
            <Button variant="outline-danger">SPRINT</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

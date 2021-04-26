import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './menu.css';

export function Menu() {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <div>
      <Navbar bg="light" expand="sm" fixed="top" collapseOnSelect="true">
        <Navbar.Brand href="home">SportStegen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="m-auto">
              <Nav.Link eventKey="home" onSelect={handleSelect}>Hem</Nav.Link>
              <Nav.Link href="#profile">Profil</Nav.Link>
              <Nav.Link href="#">Logga ut</Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

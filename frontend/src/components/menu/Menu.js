import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { switchTabHome, switchTabProfile, selectSwitchTab } from './features/tabSelectSlice';
import { Login} from "../login/Login";

export function Menu() {
  const dispatch = useDispatch();
  const text = useSelector(selectSwitchTab);
  console.log("current state: ", text);

  return (
    <div>
      <Navbar bg="light" expand="sm" fixed="top" collapseOnSelect="true">
        <Navbar.Brand href="#home">SportStegen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="m-auto">
              <Nav.Link href="#home" onSelect={() => dispatch(switchTabHome())}>Hem</Nav.Link>
              <Nav.Link href="#profile" onSelect={() => dispatch(switchTabProfile())}>Profil</Nav.Link>
              <Nav.Link href="#home"><Login /></Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

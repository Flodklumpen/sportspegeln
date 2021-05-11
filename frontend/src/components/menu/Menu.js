import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {
  Route,
  HashRouter
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from '../home/Home';
import Profile from "../profile/Profile";
import styles from './Menu.module.css';
import logo from '../../images/logo_big.png';
import { RegisterUser } from "./features/registerUser/RegisterUser";
import { ToggleLogInButton } from "./features/ToggleLogInButton";

export function Menu() {

  const { isAuthenticated } = useAuth0();

  function ifAuthenticated() {
    if (isAuthenticated) {
      return (
        <RegisterUser/>
      );
    }
    return (
      <div>

      </div>
    );
  }

  return (
    <HashRouter>
      <div className={styles.nav}>
        <Navbar bg="light" expand="sm" fixed="top" collapseOnSelect="true">
          <Navbar.Brand href="#/" className={styles.logo}><img src={logo} width={200} alt="SportStegen" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Nav className="m-auto">
                <Nav.Link href="#/">Hem</Nav.Link>
                <Nav.Link href="#/profile">Profil</Nav.Link>
                <Nav.Link><ToggleLogInButton /> { ifAuthenticated() } </Nav.Link>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className={styles.content}>
        <Route exact path="/" component={ Home }/>
        <Route path="/profile" component={ Profile }/>
      </div>
    </HashRouter>
  );
}

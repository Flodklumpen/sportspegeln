import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {
  Route,
  HashRouter
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from './Home';
import Profile from "./Profile";
import Tournament from "./tournament/Tournament";
import styles from '../css/Menu.module.css';
import logo from '../images/logo_big.png';
import { RegisterUser } from "../api/RegisterUser";
import { ToggleLogInButton } from "./ToggleLogInButton";

export function Menu() {

  const { isAuthenticated } = useAuth0();

  function ifAuthenticated() {
    if (isAuthenticated) {
      return (
        <RegisterUser/>
      );
    }
    return null;
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
        <Route path="/tournament" >
          <Tournament/>
        </Route>
      </div>
    </HashRouter>
  );
}

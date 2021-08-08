import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Route, HashRouter, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from './Home';
import Profile from "./Profile";
import Tournament from "./tournament/Tournament";
import { RegisterUser } from "../api/RegisterUser";
import { GetUserData } from "../api/GetUserData";
import { GetNrOfChallenges } from "../api/GetNrOfChallenges";
import { ToggleLogInButton } from "./ToggleLogInButton";
import { selectTournament } from "../reducers/tournament";
import styles from '../css/Menu.module.css';
import logo from '../images/logo_big.png';
import { resetNrOfChallenges } from "../reducers/getNrOfChallenges";

export function Menu() {

  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const tournament = useSelector(selectTournament);

  function getTab() {
    if (window.location.href.includes("/profile")) {
        return "#/profile"
      } else {
      return "#/"
    }
  }

  function ifAuthenticated() {
    if (isAuthenticated) {
      return (
        <div>
          <RegisterUser />
          <GetUserData />
          <GetNrOfChallenges />
        </div>
      );
    }
    dispatch(resetNrOfChallenges());
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
              <Nav className="m-auto" defaultActiveKey={ getTab() }>
                <Nav.Link href="#/">Hem</Nav.Link>
                { isAuthenticated ?
                  <Nav.Link href="#/profile">Profil</Nav.Link>
                  :
                  ''
                }
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
          {tournament.id ? <Tournament authenticated={isAuthenticated}/> : <Redirect to="/" />}
        </Route>
      </div>
    </HashRouter>
  );
}

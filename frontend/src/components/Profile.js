import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../css/Profile.module.css';
import { ProfileList } from './ProfileList';
import { useAuth0 } from "@auth0/auth0-react";
import { GetUserData } from "../api/GetUserData";
import { createMatch } from "../reducers/createMatch";
import { useSelector, useDispatch } from "react-redux";
import { joinTournament } from "../reducers/joinTournament";

export function Profile() {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const dispatch = useDispatch();

  let currentState = useSelector((state) => state);

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  if (!isAuthenticated) {
    return (<div>Not authenticated</div>);
  }

  const scrollTo = (id) => {
    const elem = document.getElementById(id);
    elem.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  };

  const token = currentState.userToken['currentUserToken'];

	return (
      <div>
        <GetUserData />
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <ListGroup as="ul" className={`${styles.profileText} d-block d-sm-none`}>
                <ListGroup.Item as="li">
                  <img src={user.picture} alt={user.name} /><br />
                  {user.name}<br />
                  {user.email}<br />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup as="ul" className={`${styles.profileText} ${styles.menu} d-none d-sm-block`}>
                <ListGroup.Item as="li">
                  <img src={user.picture} alt={user.name} /><br />
                  {user.name}<br />
                  {user.email}<br />
                </ListGroup.Item>
                <div>
                <ListGroup.Item action onClick={() => scrollTo("futureMatch")}>
                  Kommande matcher
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => scrollTo("pastMatch")}>
                  Tidigare matcher
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => scrollTo("ownedTournament")}>
                  Turneringar jag äger
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => scrollTo("competingTournament")}>
                  Turneringar jag tävlar i
                </ListGroup.Item>
                <ListGroup.Item>
                  <button onClick={() => dispatch(joinTournament("2", user.email, token))}>Gå med i turnering 2</button>
                  <button onClick={() => dispatch(createMatch("2", user.email, user.email, token))}>utmana mig själv</button>
                </ListGroup.Item>
                </div>
              </ListGroup>
            </Col>
            <Col xs={12} sm={8} className={styles.list}>
              <ProfileList/>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default Profile;
